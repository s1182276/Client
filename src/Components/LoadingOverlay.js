const template = document.createElement("template");
template.innerHTML = `
    <div id="screen_loading" class="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-filter backdrop-blur-lg">
        <div class="w-max mx-auto p-6 bg-opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <circle fill="#23F3FF" stroke="#23F3FF" stroke-width="2" r="15" cx="40" cy="100">
                    <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;"
                             keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
                </circle>
                <circle fill="#23F3FF" stroke="#23F3FF" stroke-width="2" r="15" cx="100" cy="100">
                    <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;"
                             keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
                </circle>
                <circle fill="#23F3FF" stroke="#23F3FF" stroke-width="2" r="15" cx="160" cy="100">
                    <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;"
                             keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
                </circle>
            </svg>
            <p class="text-gray-900">Bezig met laden...</p>
        </div>
    </div>
`;

class LoadingOverlay extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

window.customElements.define('loading-overlay', LoadingOverlay);