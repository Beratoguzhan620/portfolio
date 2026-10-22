window.onload = function () {
    const alanlar = ["ad", "unvan", "tel", "mail", "web", "adres", "egitim-ozet", "yetenek-ozet", "hakkimda", "is"];
    alanlar.forEach(id => {
        document.getElementById("in-" + id).oninput = function () {
            document.getElementById("out-" + id).innerText = (id === "ad" || id === "unvan") ? "{ " + this.value + " }" : this.value;
        };
    });
    document.getElementById("renk-arka").oninput = function () { document.getElementById("cv-zemin").style.backgroundColor = this.value; };
    document.getElementById("renk-sol").oninput = function () { document.getElementById("cv-sol-panel").style.backgroundColor = this.value; };
    document.getElementById("renk-isim-kutu").oninput = function () { document.getElementById("cv-isim-bg").style.backgroundColor = this.value; };
    document.getElementById("renk-isim-yazi").oninput = function () { document.getElementById("cv-isim-bg").style.color = this.value; };
    document.getElementById("sel-font").onchange = function () { document.getElementById("cv-zemin").style.fontFamily = this.value; };
    document.getElementById("sel-foto").onchange = function () { document.getElementById("cv-foto").style.borderRadius = this.value; };
    document.getElementById("renk-cizgi").oninput = function () {
        document.querySelectorAll(".baslik").forEach(b => b.style.borderColor = this.value);
    };
    document.getElementById("sel-cizgi").onchange = function () {
        document.querySelectorAll(".baslik").forEach(b => b.style.borderBottomStyle = this.value);
    };
    const dinamikEkle = (seciciId, solId, sagId, prefix) => {
        document.getElementById(seciciId).onchange = function () {
            let sol = document.getElementById(solId), sag = document.getElementById(sagId);
            sol.innerHTML = ""; sag.innerHTML = "";
            for (let i = 1; i <= this.value; i++) {
                sol.innerHTML += `<div class="satir"><span>${i}.:</span><input type="text" id="${prefix}-in-${i}"></div>`;
                sag.innerHTML += `<p id="${prefix}-out-${i}">• ${prefix} ${i}</p>`;
            }
            for (let i = 1; i <= this.value; i++) {
                document.getElementById(`${prefix}-in-${i}`).oninput = function () {
                    document.getElementById(`${prefix}-out-${i}`).innerText = "• " + this.value;
                };
            }
        };
    };
    dinamikEkle("okul-sayisi", "okul-girdi-alani", "out-okul-liste", "Okul");
    dinamikEkle("yet-sayisi", "yet-girdi-alani", "out-yet-liste", "Yetenek");
};