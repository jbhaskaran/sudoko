
export default async function generateGame(difficulty) {
  const url = `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${difficulty}`; 
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
