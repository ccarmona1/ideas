async function init() {
  setInterval(() => {
    console.log('Backend is running');
  }, 60000);
}

await init();
export default init;
