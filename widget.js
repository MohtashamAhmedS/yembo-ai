function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

document.addEventListener("DOMContentLoaded", function () {
  // Setup date picker
  flatpickr("#moveDate", {
    placeholder: "Select a Date",
    dateFormat: "Y-m-d",
  });

  // Setup phone input
  const input = document.querySelector("#phone");
  if (input) {
    window.intlTelInput(input, {
      loadUtils: () =>
        import(
          "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"
        ),
    });
  }

  // Setup widget/modal behavior
  setupYemboBallparkEstimateWidget();

  // Handle form submission (Step 2 → Step 3)
  const form = document.getElementById("contact-form");
  const step2 = document.querySelector('.content[data-step="2"]');
  const step3 = document.querySelector('.content[data-step="3"]');

  if (form && step2 && step3) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent actual submission

      // Browser validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // If valid, move to Step 3
      step2.classList.remove("active");
      step3.classList.add("active");
    });
  }
});

// Widget setup function
document.addEventListener("DOMContentLoaded", () => {
  setupYemboBallparkEstimateWidget();

  // Handle form submission (Step 2 → Step 3)
  const form = document.getElementById("contact-form");
  const step2 = document.querySelector('.content[data-step="2"]');
  const step3 = document.querySelector('.content[data-step="3"]');

  if (form && step2 && step3) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      step2.classList.remove("active");
      step3.classList.add("active");
    });
  }
});

function setupYemboBallparkEstimateWidget() {
  const startBtn = document.getElementById("yembo-start");
  const modal = document.getElementById("yembo-modal");
  const overlay = modal?.querySelector(".overlay");
  const closeBtn = modal?.querySelector(".close");
  const backgroundOverlay = document.getElementById("yembo-overlay");

  const step1 = modal?.querySelector('.content[data-step="1"]');
  const step2 = modal?.querySelector('.content[data-step="2"]');
  const step3 = modal?.querySelector('.content[data-step="3"]');
  const step4 = modal?.querySelector('.content[data-step="4"]');

  const next1 = modal?.querySelector("#yembo-next");
  const back2 = modal?.querySelector("#yembo-back");
  const back3 = modal?.querySelector("#yembo-back-2");
  const submit = modal?.querySelector("#yembo-submit");
  const finishBtn = modal?.querySelector("#yembo-finish");
  const closeFinalBtn = modal?.querySelector("#yembo-close-final");

  if (!startBtn || !modal) return;

  // Open modal
  startBtn.addEventListener("click", () => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (backgroundOverlay) backgroundOverlay.style.display = "block";

    // Reset steps
    step1?.classList.add("active");
    step2?.classList.remove("active");
    step3?.classList.remove("active");
    step4?.classList.remove("active");
  });

  // Close modal
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    if (backgroundOverlay) backgroundOverlay.style.display = "none";

    // Reset all steps
    step1?.classList.add("active");
    step2?.classList.remove("active");
    step3?.classList.remove("active");
    step4?.classList.remove("active");
  }

  closeBtn?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // Step transitions
  next1?.addEventListener("click", () => {
    step1?.classList.remove("active");
    step2?.classList.add("active");
  });

  back2?.addEventListener("click", () => {
    step2?.classList.remove("active");
    step1?.classList.add("active");
  });

  back3?.addEventListener("click", () => {
    step3?.classList.remove("active");
    step2?.classList.add("active");
  });

  submit?.addEventListener("click", (e) => {
    e.preventDefault();

    const step2Form =
      modal?.querySelector("#yembo-ballpark-estimate-widget-form-step2") ||
      form;
    if (!step2Form) return;

    if (!step2Form.checkValidity()) {
      step2Form.reportValidity();
      return;
    }

    step2?.classList.remove("active");
    step3?.classList.add("active");
  });

  if (step4) {
    const isMobile = isMobileDevice();
    const desktopBlock = step4.querySelector(".desktop-step4");
    const mobileBlock = step4.querySelector(".mobile-step4");

    if (isMobile) {
      mobileBlock.style.display = "flex";
      desktopBlock.style.display = "none";
    } else {
      mobileBlock.style.display = "none";
      desktopBlock.style.display = "flex";
    }
  }

  finishBtn?.addEventListener("click", () => {
    const isMobile = isMobileDevice();

    if (isMobile) {
      // Redirect to link on mobile
      window.location.href = "https://yembo.ai/"; // ← replace with your actual mobile link
    } else {
      // Show Step 4 with QR code on desktop
      step3?.classList.remove("active");

      const step4Content = step4?.querySelector("p");
      const qrImg = step4?.querySelector("img");

      if (step4Content && qrImg) {
        step4Content.textContent =
          "Scan the QR code below to start your virtual walkthrough.";
        qrImg.style.display = "block";
      }

      step4?.classList.add("active");
    }
  });

  closeFinalBtn?.addEventListener("click", closeModal);
}

window.yemboBallparkEstimateWidget = {
  ctaText: "Get a free estimate",
  currencyUnit: "GBP",
  parameters: {
    PRIVACY_POLICY_LINK:
      "https://gosselingroup.eu/sites/default/files/files/2020-11/POL-GDPR-002-GOS%20Privacy%20policy%20towards%20her%20customers_EN.pdf",
  },
  yemboApiEndpoint: "https://api.mariner.staging.yembo.ai",
  steps: [
    {
      id: "moveType",
      title: "Tell us about your move",
      inputs: [
        {
          type: "dropdown",
          label: "I am moving",
          options: [
            { value: "Just a few items" },
            { value: "1 bedroom" },
            { value: "2 bedrooms" },
            { value: "3 bedrooms", isDefault: true },
            { value: "4 bedrooms" },
            { value: "5+ bedrooms" },
          ],
        },
        {
          type: "place",
          label: "From",
        },
        {
          type: "place",
          label: "To",
        },
      ],
      ctaText: "Next",
    },
    {
      id: "contactInfo",
      title: "What is your contact info?",
      inputs: [
        {
          type: "text",
          label: "First name",
        },
        {
          type: "text",
          label: "Last name",
        },
        {
          type: "phone",
          label: "Phone",
        },
        {
          type: "email",
          label: "Email",
        },
        {
          type: "checkbox",
          label: "I consent to be contacted via SMS",
        },
      ],
      footerHtml:
        "We respect your privacy. The information you provide will only be used to generate the quote you requested. For more details, please review our <a href='$(PRIVACY_POLICY_LINK)' target='_blank'>Privacy Policy</a>",
      ctaText: "Get your estimate now",
    },
    {
      id: "estimate",
      options: [
        {
          label: "directToSelfSurvey",
          conditions: {
            or: [
              {
                label: "I am moving",
                values: [
                  "Just a few items",
                  "1 bedroom",
                  "2 bedrooms",
                  "3 bedrooms",
                  "4 bedrooms",
                ],
              },
              {
                and: [
                  {
                    label: "From",
                    values: [
                      "AL",
                      "AT",
                      "BA",
                      "BE",
                      "BG",
                      "BY",
                      "CH",
                      "CY",
                      "CZ",
                      "DE",
                      "DK",
                      "EE",
                      "ES",
                      "FI",
                      "FR",
                      "GB",
                      "GR",
                      "HR",
                      "HU",
                      "IE",
                      "IS",
                      "IT",
                      "LT",
                      "LU",
                      "LV",
                      "MD",
                      "ME",
                      "MK",
                      "MT",
                      "NL",
                      "NO",
                      "PL",
                      "PT",
                      "RO",
                      "RS",
                      "RU",
                      "SE",
                      "SI",
                      "SK",
                      "SM",
                      "TR",
                      "UA",
                      "VA",
                    ],
                  },
                  {
                    label: "To",
                    values: [
                      "AL",
                      "AT",
                      "BA",
                      "BE",
                      "BG",
                      "BY",
                      "CH",
                      "CY",
                      "CZ",
                      "DE",
                      "DK",
                      "EE",
                      "ES",
                      "FI",
                      "FR",
                      "GB",
                      "GR",
                      "HR",
                      "HU",
                      "IE",
                      "IS",
                      "IT",
                      "LT",
                      "LU",
                      "LV",
                      "MD",
                      "ME",
                      "MK",
                      "MT",
                      "NL",
                      "NO",
                      "PL",
                      "PT",
                      "RO",
                      "RS",
                      "RU",
                      "SE",
                      "SI",
                      "SK",
                      "SM",
                      "TR",
                      "UA",
                      "VA",
                    ],
                  },
                ],
              },
            ],
          },
          heading:
            "Your $(MOVE_TYPE) move from $(ORIGIN) to $(DESTINATION) is estimated to cost:",
          captionHtml:
            "Start your <strong>free virtual walkthrough</strong> to get tailored pricing and expert advice.",
          footerText:
            "This ballpark figure is for initial guidance only. A personalized quote will be provided after your virtual walkthrough.",
          ctaText: "Get your personalized quote",
          desktopHeading: "Continue on your mobile device!",
          desktopCaptionHtml:
            "<strong>Scan this QR code</strong> on <strong>your mobile device</strong> to launch your virtual walkthrough!",
        },
        {
          label: "scheduleCall",
          heading: "Your estimate is on the way!",
          bodyParagraphs: [
            "For complex moves, our experts will review your information and reach out to provide the most accurate estimate.",
            "We'll be in touch soon by phone or email with your personalized estimate.",
            "Expect to hear from us within 2 business days.",
          ],
        },
      ],
    },
  ],
};
