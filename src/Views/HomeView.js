import "../Components/Leerroute/StudyRoute";
import "../Components/Leerroute/module-card";

export default (() => {
    const render = async () => {
        return `
        <div class="flex-col items-center w-full bg-white rounded-md shadow-md md:p-6 md:w-3/4 lg:w-5/6 schoolYear">
    <div class="flex flex-col items-center w-full">
      <study-route-form></study-route-form>
    </div>
  </div>`;
    };

    const afterRender = () => {};

  return { render, afterRender };
})();
