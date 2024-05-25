import type { MetaFunction } from "@remix-run/node";
import { Input } from "@nextui-org/input";
import data from "../utils/data";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function capitalizeFirstLetter(string: string) {
  if (!string) return string; // Maneja el caso de una cadena vacía
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function compareByName(a:any, b:any) {
  const nameA = a.word.toUpperCase();
  const nameB = b.word.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}
const sortData = data.sort(compareByName);

export default function Index() {
  return (
    <div className="md:w-4/5 mx-auto">
      <h1 className="my-8">GLOSARY</h1>

      {sortData.map((e) => {
        return (
          <a href={`definition/${e?.word.toLowerCase()}`}>
            <h2>{capitalizeFirstLetter(e.word)}</h2>
          </a>
        );
      })}
    </div>
  );
}
