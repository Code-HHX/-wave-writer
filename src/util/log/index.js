export default function index(message) {
  if (process.env.NODE_ENV === "dev") {
    console.log(message);
  }
}
