package org.dape1700oblig3;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HomeController {
    private List<Billett> liste = new ArrayList<>();

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett) {
        liste.add(innBillett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentBillett() {
        return liste;
    }

    @GetMapping("/slettAlle")
    public void slettAlle() {
        liste.clear();
    }
}
