import {addUser} from "../../lib/action";

export default function ContactPage() {
  return (
    <div>
      <form action={addUser}>
        <input type="text" name="name" min={3} max={50} placeholder="name" />
        <input
          type="text"
          name="username"
          min={3}
          max={20}
          placeholder="username"
        />
        <input type="email" name="email" max={50} placeholder="email" />
        <input
          type="password"
          name="password"
          min={5}
          max={15}
          placeholder="password"
        />
        <input type="text" name="imgSrc" placeholder="img src" />
        <button>Test me</button>
      </form>
    </div>
  );
}
