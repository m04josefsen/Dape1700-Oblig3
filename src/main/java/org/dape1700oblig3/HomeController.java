package org.dape1700oblig3;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
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
        if(!repository.lagreBillett(innBillett)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB");
        }
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentBillett() {
        return repository.hentBillett();
    }

    @DeleteMapping("/slettAlle")
    public void slettAlle(HttpServletResponse response) throws IOException {
        if(!repository.slettBillett()) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB");
        }
    }

    @GetMapping("/hentEnBillett")
    public Billett hentEnBillett(int id) {
        return repository.hentEnBillett(id);
    }

    @PostMapping("/oppdaterEnBillett")
    public void oppdaterEnBillett(Billett innBillett, HttpServletResponse response) throws IOException {
        if(!repository.oppdaterEnBillet(innBillett)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB");
        }
    }

    @DeleteMapping("/slettEnBillett")
    public void slettEnBillett(int id, HttpServletResponse response) throws IOException {
        if(!repository.slettEnBillett(id)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB");
        }
    }
}
