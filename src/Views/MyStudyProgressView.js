export default (() => {
    let user;

    const render = async () => {
        // Logic before rendering
        user = await window.apiModule.getCurrentUser();

        return `

<div class="flex items-center w-1/3">
  <div class="bg-beige p-6 rounded-lg shadow-md w-full max-w-sm">
    <div class="mb-4">
      <label for="start-year-select" class="block text-zinc-700 mb-2">Startjaar</label>
      <select id="start-year-select" class="block w-full border border-zinc-300 rounded-md py-2 px-3 bg-white text-zinc-900"></select>
    </div>
    <div class="mb-4">
      <label for="credits-input" class="block text-zinc-700 mb-2">EC's (Studiepunten)</label>
      <input type="number" id="credits-input" value="${user.ecPoints}" class="block w-full border border-zinc-300 rounded-md py-2 px-3 bg-white text-zinc-900"/>
    </div>
    <div class="mb-4">
      <label for="has-propedeuse" class="block text-zinc-700 mb-2">Propedeuse behaald?</label>
      <input type="checkbox" id="has-propedeuse" class="block border border-zinc-300 rounded-md py-2 px-3 text-zinc-900"/>
    </div>
    <button id="save-button" class="w-full bg-navyblue text-white py-2 rounded-md">Opslaan</button>
    <div id="save-status-container" class="my-2"></div>
  </div>
</div>

`
    };

    const afterRender = () => {
        const selectStartYear = document.getElementById("start-year-select");
        let max = new Date().getFullYear();
        let min = max - 20;

        for (let i = max; i > min; i--) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            selectStartYear.appendChild(opt);
        }

        selectStartYear.childNodes.forEach(child => {
            if(child.value == user.startingYear){
                child.selected = 'selected';
            }
        });

        document.getElementById("has-propedeuse").checked = user.hasPropedeuse;

        document.getElementById("save-button").addEventListener("click", () => {
            let saveStatusContainer = document.getElementById("save-status-container");
            saveStatusContainer.innerHTML = "";

            let startYear = selectStartYear.options[selectStartYear.selectedIndex].value;
            let credits = document.getElementById("credits-input").value;
            let hasPropedeuse = document.getElementById("has-propedeuse").checked;

            console.log(startYear);
            window.apiModule.updateUserStudyProgress(credits, startYear, hasPropedeuse).then(() => {
                saveStatusContainer.innerHTML = "<p class='text-green-800'>Successvol opgeslagen</p>"
            }).catch((error) => {
                saveStatusContainer.innerHTML = "<p class='text-red-800'>Onverwachte fout opgetreden tijdens het opslaan</p>"
            });
        })
    };

    return { render, afterRender };
})();
