let lastID = 6;

function generateID() {
  lastID += 1;
  return lastID.toString();
}

export { generateID };