let teller = 0;

function kjopBillett() {
    const billett = {
        film : $("#velgFilm").val(),
        antall : Number($("#innAntall").val()),
        fornavn : $("#innFornavn").val(),
        etternavn : $("#innEtternavn").val(),
        telefonnr : Number($("#innTelefonnr").val()),
        epost : $("#innEpost").val()
    };

    //Teller for å sjekke at input feltene er riktig
    teller = 0;

    //Input validering for antall;
    if(isNaN(billett.antall) || billett.antall <= 0) {
        let ut = "Du må skrive noe over 0 i antall";
        ut = ut.fontcolor("RED");
        document.getElementById("feilmeldingAntall").innerHTML = ut;
    }
    else {
        teller++;
    }

    //Input validering for telefonnr;
    telefonnrValidering(billett.telefonnr);

    //Input validering for mail
    epostValidering(billett.epost);

    //Input validering for resten;
    stringValidering(billett.fornavn, "fornavn");
    stringValidering(billett.etternavn, "etternavn");

    if(teller === 5) {
        $.post("lagre", billett, function() {
            $.get("hentAlle", function(billett) {
                visResultat(billett)
            });
        });

        //Tømmer input feltene
        document.getElementById("innAntall").value = "";
        document.getElementById("innFornavn").value = "";
        document.getElementById("innEtternavn").value = "";
        document.getElementById("innTelefonnr").value = "";
        document.getElementById("innEpost").value = "";

        document.getElementById("feilmeldingAntall").innerHTML = "";
        document.getElementById("feilmeldingfornavn").innerHTML = "";
        document.getElementById("feilmeldingetternavn").innerHTML = "";
        document.getElementById("feilmeldingTelefonnr").innerHTML = "";
        document.getElementById("feilmeldingEpost").innerHTML = "";
    }
}

function visResultat(billett) {
    let ut = "<table class='table table-striped table-bordered'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
        "</tr>";

    for(let b of billett) {
                ut += "<tr>";
                ut += "<td>" + b.film + "</td><td>" + b.antall + "</td><td>" + b.fornavn +
                      "</td><td>" + b.etternavn + "</td><td>" + b.telefonnr +  "</td><td>" + b.epost + "</td>";
                ut += "</tr>";
            }
    ut += "</table>";

    document.getElementById("resultat").innerHTML = ut;
}

function stringValidering(string, type) {
    let navnPattern = /^[a-zA-ZæøåÆØÅ]+$/;

    if(!navnPattern.test(string)) {
        let ut = "Må skrive inn et gyldig " + type;
        ut = ut.fontcolor("RED");
        document.getElementById("feilmelding" + type).innerHTML = ut;
    }
    else {
        teller++;
    }
}

function telefonnrValidering(telefonnr) {
    let telefonnrPattern = /^(\+47)?\d{8}$/;

    if(!telefonnrPattern.test(telefonnr)) {
        let ut = "Må skrive inn et gyldig telefonnr";
        ut = ut.fontcolor("RED");
        document.getElementById("feilmeldingTelefonnr").innerHTML = ut;
    }
    else {
        teller++;
    }
}

function epostValidering(epost) {
    let epostPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!epostPattern.test(epost)) {
        let ut = "Må skrive inn en gyldig e-postadresse";
        ut = ut.fontcolor("RED");
        document.getElementById("feilmeldingEpost").innerHTML = ut;
    } else {
        teller++;
    }
}

function slettAlle() {
    $.get("slettAlle", function() {
        $.get("hentAlle", function(billett) {
            visResultat(billett)
        });
    });

}