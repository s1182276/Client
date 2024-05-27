import NavigationManager from "../Modules/NavigationManager";

export default (() => {
  const render = async () => {
      // Logic before rendering

      return `

      <div class="flex items-center justify-center min-h-screen">
      
      <button type="button" class="rounded-full py-2 px-4" id="newLearningRouteBtn">Nieuwe leerroute</button>

      <div class="space-x-4 text-left">
      <div>
        <button type="button" id="mijnLeerroutes" 
                class="inline-flex justify-center w-full rounded-full border shadow-sm
                px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Mijn leerroutes
          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>

        <div id="mijnLeerroutesMenu" class="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <!--dynamically add learningroutes-->

        </div>
      </div>     
      </div>
    </div>

    </div>

     `
  };

  const afterRender = () => {
    document.getElementById('newLearningRouteBtn').addEventListener('click', function() {
      redirectTo("leerroute");
    });
  
    const redirectTo = (path) => {
      location.hash = `${location.hash === '#/' && location.hash !== '#/' ? `/${path}` : `#/${path}`}`;
    }

    document.getElementById('mijnLeerroutes').addEventListener('click', function() {
      var menu = document.getElementById('mijnLeerroutesMenu');
      menu.classList.toggle('hidden');
    });
  
    window.addEventListener('click', function(e) {
      var button = document.getElementById('mijnLeerroutes');
      var menu = document.getElementById('mijnLeerroutesMenu');
      if (!button.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });
  
  };

  

  return { render, afterRender };
})();