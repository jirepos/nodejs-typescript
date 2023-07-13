function c(n, o) {
  return n + o;
}
function s(n, o) {
  return n - o;
}
const t = {};
function e() {
  console.log(t.join("a", "b", "c"));
}
function r() {
  console.log("version");
}
export {
  s as subtract,
  c as sum,
  e as testPath,
  r as versions
};
