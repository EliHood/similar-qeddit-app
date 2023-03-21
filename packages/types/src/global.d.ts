declare global {
  interface Window {
    runtimeConfig: any;
  }
}

console.log("testingggggg");

window.runtimeConfig = {
  localApiGateway: "http://localhost:3001/",
  devApiGateway: "",
};

export {};
