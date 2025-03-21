const { ipcRenderer } = require(Electron);

function saveText() {
    const text = document.getElementById("text-notes").value;
    ipcRenderer.send("save-file", text)

}

function clearText() {
    let textArea = document.getElementById("text-notes");

    textArea.value = ""
}