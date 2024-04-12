package org.dape1700oblig3;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private BillettRepository repository;

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett, HttpServletResponse response) throws IOException {
        //FÅR DOBBELT LAGRING; SKJEDDE ETTER JEG LA TIL ERROR HANDLING
        if(!repository.lagreBillett(innBillett)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentBillett() {
        return repository.hentBillett();
    }

    @GetMapping("/slettAlle")
    public void slettAlle() {
        repository.slettBillett();
    }
}
