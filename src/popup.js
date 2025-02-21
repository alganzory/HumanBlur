var settings = {};

initPopup();

const refreshableSettings = [
	"blurImages",
	"blurVideos",
	"blurMale",
	"blurFemale",
	"unblurImages",
	"unblurVideos",
	"blurryStartMode",
	"strictness",
	"whitelist",
];

const allSettings = ["blurAmount", "gray", ...refreshableSettings];

var currentWebsite, refreshMessage, container;

const initCalls = async () => {
  const browserLang = navigator.language?.split("-")[0] ?? "en";
  
  // Ожидаем загрузки и применения языка
  await changeLanguage(settings.language ?? browserLang, settings);
  
  // Теперь, когда язык загружен, отображаем настройки и добавляем слушатели
  displaySettings(settings);
  addListeners();
};

function initPopup() {
	loadLocalSettings().then(() => getCurrentWebsite()).then(
		() => {
		if (document.readyState === "complete" || "interactive") {
			initCalls();
		} else {
			document.addEventListener("DOMContentLoaded", initCalls);
		}
	});
}

async function loadLocalSettings() {
	const storage = await browser.storage.sync.get(["hb-settings"]);

	settings = storage["hb-settings"];
}

function getCurrentWebsite() {
	return new Promise(function (resolve) {
		chrome.tabs?.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(
				tabs[0].id,
				{ type: "getCurrentWebsite" },
				function (response) {
					console.log("🚀 ~ response:", response)
					currentWebsite = response?.currentWebsite?.split("www.")?.[1] ?? response?.currentWebsite ?? null;
					resolve()
				}
			);
		});
	});
}


function toggleAllInputs() {
	if (container) {
		container.style.opacity = settings.status ? 1 : 0.5;
	}
	allSettings.forEach(function (setting) {
		document.querySelector("input[name=" + setting + "]").disabled =
			!settings.status;
	});
}

function displaySettings(settings) {
	console.log ("display settings", settings);
	document.querySelector("input[name=status]").checked = settings.status;
	document.querySelector("input[name=blurryStartMode]").checked =
		settings.blurryStartMode;
	document.querySelector("input[name=blurAmount]").value =
		settings.blurAmount;
	document.getElementById("blur-amount-value").innerHTML = `${settings.blurAmount}%`;
	document.querySelector("input[name=gray]").checked = settings.gray ?? true;
	document.querySelector("input[name=strictness]").value =
		+settings.strictness;
	document.querySelector("span[id=strictness-value]").innerHTML =
		+settings.strictness * 100 + "%";
	document.querySelector("input[name=blurImages]").checked =
		settings.blurImages;
	document.querySelector("input[name=blurVideos]").checked =
		settings.blurVideos;
	document.querySelector("input[name=blurMale]").checked = settings.blurMale;
	document.querySelector("input[name=blurFemale]").checked =
		settings.blurFemale;
	document.querySelector("input[name=unblurImages]").checked =
		settings.unblurImages;
	document.querySelector("input[name=unblurVideos]").checked =
		settings.unblurVideos;
	document.getElementById("language").value = settings.language;
	displayWhiteList();
	toggleAllInputs();
}

/* addListeners - (1) Listen for changes to popup modal inputs (2) route to appropriate function  */
function addListeners() {
	document
		.querySelector("input[name=status]")
		.addEventListener("change", updateStatus);
	document
		.querySelector("input[name=blurryStartMode]")
		.addEventListener("change", updateCheckbox("blurryStartMode"));
	document
		.querySelector("input[name=blurImages]")
		.addEventListener("change", updateCheckbox("blurImages"));
	document
		.querySelector("input[name=blurVideos]")
		.addEventListener("change", updateCheckbox("blurVideos"));
	document
		.querySelector("input[name=blurMale]")
		.addEventListener("change", updateCheckbox("blurMale"));
	document
		.querySelector("input[name=blurFemale]")
		.addEventListener("change", updateCheckbox("blurFemale"));
	document
		.querySelector("input[name=blurAmount]")
		.addEventListener("change", updateBlurAmount);
	document
		.querySelector("input[name=gray]")
		.addEventListener("change", updateCheckbox("gray"));
	document
		.querySelector("input[name=strictness]")
		.addEventListener("change", updateStrictness);
	document
		.querySelector("input[name=unblurImages]")
		.addEventListener("change", updateCheckbox("unblurImages"));
	document
		.querySelector("input[name=unblurVideos]")
		.addEventListener("change", updateCheckbox("unblurVideos"));
	document.getElementById("language")
		.addEventListener("change", function () {
		changeLanguage(this.value, settings);
		});
	document.getElementById("whitelist")
			.addEventListener("change", updateWhitelist);

	refreshMessage = document.querySelector("#refresh-message");
	container = document.querySelector("#container");
}

function displayWhiteList(skipSet = false) {
	const whiteListContainer = document.getElementById("whitelist-container");
	const whiteList = document.getElementById("whitelist");
	const websiteName = document.getElementById("website-name")
	const whiteListStatusOn = document.getElementById("whitelist-status-on")
	const whiteListStatusOff = document.getElementById("whitelist-status-off")
	if (!currentWebsite) {
		whiteListContainer.classList.add("hidden");
		return;
	} else {
		whiteListContainer.classList.remove("hidden");
	}
	if (!skipSet) {
		websiteName.innerHTML = currentWebsite;
		whiteList.checked = !settings.whitelist.includes(currentWebsite);
	}
	if (whiteList.checked) {
		whiteListStatusOn.classList.remove("hidden");
		whiteListStatusOff.classList.add("hidden");
	} else {
		whiteListStatusOn.classList.add("hidden");
		whiteListStatusOff.classList.remove("hidden");
	}
}


function updateStatus() {
	settings.status = document.querySelector("input[name=status]").checked;
	browser.storage.sync.set({ "hb-settings": settings });
	toggleAllInputs();
	sendUpdatedSettings("status");
	showRefreshMessage("status");
}

function updateBlurAmount() {
	settings.blurAmount = document.querySelector(
		"input[name=blurAmount]"
	).value;
	document.querySelector("span[id=blur-amount-value]").innerHTML =
		settings.blurAmount + "%";
	browser.storage.sync.set({ "hb-settings": settings });
	sendUpdatedSettings("blurAmount");
	showRefreshMessage("blurAmount");
}

function updateStrictness() {
	settings.strictness = document.querySelector(
		"input[name=strictness]"
	).value;

	document.querySelector("span[id=strictness-value]").innerHTML =
		+settings.strictness * 100 + "%";

	browser.storage.sync.set({ "hb-settings": settings });
	sendUpdatedSettings("strictness");
	showRefreshMessage("strictness");
}

function updateCheckbox(key) {
	return function () {
		settings[key] = document.querySelector(
			"input[name=" + key + "]"
		).checked;
		browser.storage.sync.set({ "hb-settings": settings });
		sendUpdatedSettings(key);
		showRefreshMessage(key);
	};
}


async function changeLanguage(lang, settings) {  
  // Set language attribute
  document.body.lang = lang;
  
  // Get text direction from the existing HB_TRANSLATIONS_DIR
  const direction = HB_TRANSLATIONS_DIR[lang] || "ltr";
  document.getElementById('container').dir = direction;
  
  try {
    // Load translations from file
    const response = await fetch(browser.runtime.getURL(`src/assets/locales/${lang}.json`));
    if (!response.ok) {
      console.error(`Failed to load ${lang} translation: ${response.statusText}`);
      // Continue with current translations if file can't be loaded
      return;
    }
    
    const translations = await response.json();
    
    // Apply translations to DOM elements
    Object.keys(translations).forEach(key => {
      const elements = document.querySelectorAll(key);
      elements.forEach(element => {
        element.innerHTML = translations[key];
        // Set direction for each element if needed
        element.dir = direction;
      });
    });
    
    // Save user's language preference
    settings.language = lang;
    browser.storage.sync.set({ "hb-settings": settings });

	displaySettings(settings);
  } catch (error) {
    console.error(`Error changing language to ${lang}:`, error);
  }
}	

function updateWhitelist (e) {
	if (e.target.checked){
		settings.whitelist = settings.whitelist.filter(item => item !== currentWebsite);
	} else {
		settings.whitelist.push(currentWebsite);
	}
	chrome.storage.sync.set({ "hb-settings": settings });
	sendUpdatedSettings("whitelist");
	showRefreshMessage("whitelist");
	displayWhiteList(true);
}


/* sendUpdatedSettings - Send updated settings object to tab.js to modify active tab blur CSS */
function sendUpdatedSettings(key) {
	const message = {
		type: "updateSettings",
		newSetting: {
			key: key,
			value: settings[key],
		},
	};

	browser.runtime.sendMessage(message);
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, message);
	});
}

function showRefreshMessage(key) {
	if (refreshableSettings.includes(key)) {
		refreshMessage.classList.remove("hidden");
	}
}
