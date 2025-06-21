async function init() {
  setInterval(() => {
    console.log('Backend is running');
  }, 1000);
}

await init();
export default init;
