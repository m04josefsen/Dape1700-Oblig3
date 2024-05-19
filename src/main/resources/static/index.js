let teller = 0;
let userID;

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
            hentAlle();
        });

        tomInputfelt();
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
        ut += "<td> <button class='btn btn-primary'onclick='endreBillett("+b.id+")'>Endre</button></td>";
        ut += "<td> <button class='btn btn-danger'onclick='slettEnKunde("+b.id+")'>Slett</button></td>";
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
    $.ajax({
        url: '/slettAlle',
        type: 'DELETE'
    }).done(function() {
        hentAlle();
    }).fail(function(xhr, status, error) {
        // Handle error here
        console.error('Delete failed:', error);
    });

}

function slettEnKunde(id) {
    const url = "/slettEnBillett?id=" + id;

    $.ajax({
        url: url,
        type: 'DELETE'
    }).done(function() {
        hentAlle();
    }).fail(function(xhr, status, error) {
        console.error('Delete failed:', error);
    })
}

function endreBillett(id) {
    userID = id;
    const url = "/hentEnBillett?id=" + id;
    $.get(url, function(billett) {
        document.getElementById("innAntall").value = billett.antall;
        document.getElementById("innFornavn").value = billett.fornavn;
        document.getElementById("innEtternavn").value = billett.etternavn;
        document.getElementById("innTelefonnr").value = billett.telefonnr;
        document.getElementById("innEpost").value = billett.epost;
    });

    document.getElementById("oppdaterBtn").style.display = "initial";
    document.getElementById("kjopBtn").style.display = "none";
}

function oppdaterBillett() {
    const billett = {
        id : userID,
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
        $.post("oppdaterEnBillett", billett, function() {
            hentAlle();
        });

        tomInputfelt()

        document.getElementById("oppdaterBtn").style.display = "none";
        document.getElementById("kjopBtn").style.display = "initial";
        hentAlle();
    }
}

function hentAlle() {
    $.get("hentAlle", function(billett) {
        visResultat(billett);
    });
}

function tomInputfelt() {
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