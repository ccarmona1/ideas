async function init() {
  setInterval(() => {
    console.log('Backend is running');
  }, 10000);
}

await init();
export default init;
