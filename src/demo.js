setTimeout(() => {
  console.log("timeout");
}, 10);
Promise.resolve().then(() => console.log("Promise"));

console.log("Others");
