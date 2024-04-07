package org.dape1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private KundeRepository repository;

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett) {
        repository.lagreKunde(innBillett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentBillett() {
        return repository.hentKunder();
    }

    @GetMapping("/slettAlle")
    public void slettAlle() {
        repository.slettKunder();
    }
}
