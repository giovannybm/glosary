import { useLoaderData } from "@remix-run/react";
import { Card, CardBody } from "@nextui-org/react";
import { util } from "../utils/returnData";

export const loader = async ({ params }: any) => {
  return util.wordsearch(params.word) ?? null;
};

function capitalizeFirstLetter(string: string) {
  if (!string) return string; // Maneja el caso de una cadena vacía
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const synct = (word: string | undefined) => {
  if ("speechSynthesis" in window && word ) {
    const synthesis = window.speechSynthesis;

    // Create a new speech utterance
    const utterance = new SpeechSynthesisUtterance(word);

    // Optional: Set properties like voice, rate, pitch, etc.
    // utterance.voice = synthesis.getVoices()[0]; // Set the voice
    // utterance.rate = 1.0; // Set the rate (speed) of speech
    // utterance.pitch = 1.0; // Set the pitch (intonation) of speech

    // Speak the text
    synthesis.speak(utterance);
  } else {
    console.log("Speech synthesis not supported");
  }
};

export default function Definition() {
  const word = useLoaderData<typeof loader>();
  return (
    <div className="md:w-4/5 mx-auto">
        <div className="text-sky-600"><a href="/"><Home/></a></div>
      <div
        className="flex my-4 cursor-pointer"
        onClick={() => synct(word?.word)}
      >
        <Speak />
        <h1>{capitalizeFirstLetter(word?.word as string)} </h1>
      </div>
      <p
        className="my-2"
        dangerouslySetInnerHTML={createMarkup(word?.clasification)}
      />
      <Card>
        <CardBody>
          <div dangerouslySetInnerHTML={createMarkup(word?.definition)} />
        </CardBody>
        <CardBody>
          <h3>Example(s):</h3>
          <ul>
            {word?.examples.map((e) => {
              return <li dangerouslySetInnerHTML={createMarkup(e)} />;
            })}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

function createMarkup(param: any) {
  return { __html: param };
}
const Speak = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-12 w-12 "
    >
      <title>volume-high</title>
      <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
    </svg>
  );
};

const Home = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 fill-sky-600">
      <title>home-circle</title>
      <path d="M19.07,4.93C17.22,3 14.66,1.96 12,2C9.34,1.96 6.79,3 4.94,4.93C3,6.78 1.96,9.34 2,12C1.96,14.66 3,17.21 4.93,19.06C6.78,21 9.34,22.04 12,22C14.66,22.04 17.21,21 19.06,19.07C21,17.22 22.04,14.66 22,12C22.04,9.34 21,6.78 19.07,4.93M17,12V18H13.5V13H10.5V18H7V12H5L12,5L19.5,12H17Z" />
    </svg>
  );
};
