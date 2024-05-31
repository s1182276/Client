export default (() => {
    const render = async () => {
        // Logic before rendering

        return `<h1>Feedback</h1>`
    };

    const afterRender = () => {
        // logic after rendering
    };

    return { render, afterRender };
})();