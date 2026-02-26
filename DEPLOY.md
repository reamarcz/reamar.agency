# Nasazení reamar.cz na Vercel

Projekt je připraven: máte první Git commit a vše je připravené k pushi na GitHub a deployi na Vercel.

---

## Krok 1: Vytvořit repozitář na GitHubu

1. Otevřete **https://github.com/new**
2. **Repository name:** `reamar.cz` (nebo např. `reamar-web`)
3. **Public**, **Add a README** nezaškrtávejte (projekt už README má)
4. Klikněte **Create repository**

---

## Krok 2: Propojit lokální projekt s GitHubem a pushnout

V terminálu (v adresáři projektu) spusťte (nahraďte `VASE_GITHUB_USERNAME` svým přihlašovacím jménem na GitHubu):

```bash
cd /Users/jansura/Desktop/reamar.cz

# Přidat remote (URL získáte na stránce nového repa po vytvoření)
git remote add origin https://github.com/VASE_GITHUB_USERNAME/reamar.cz.git

# Odeslat kód na GitHub
git push -u origin main
```

Pokud máte repozitář pod jiným názvem, použijte ten v URL, např.  
`https://github.com/VASE_GITHUB_USERNAME/reamar-web.git`

Při prvním pushi se může zeptat na přihlášení do GitHubu (přihlášení v prohlížeči nebo token).

---

## Krok 3: Propojit projekt s Vercel

1. Jděte na **https://vercel.com** a přihlaste se (ideálně **Continue with GitHub**).
2. Klikněte **Add New…** → **Project**.
3. V seznamu **Import Git Repository** vyberte repozitář **reamar.cz** (nebo jak jste ho pojmenovali).
4. **Configure Project:**
   - **Framework Preset:** Vercel by měl sám rozpoznat **Astro**. Pokud ne, zvolte **Astro**.
   - **Build Command:** `npm run build` (výchozí)
   - **Output Directory:** `dist` (výchozí pro Astro)
   - **Install Command:** `npm install`
5. Klikněte **Deploy**.

Po dokončení buildu dostanete odkaz typu `https://reamar-cz-xxx.vercel.app`. Ten můžete později napojit na vlastní doménu **reamar.cz** v nastavení projektu na Vercelu (Settings → Domains).

---

## Po nasazení: vlastní doména reamar.cz

1. Vercel → váš projekt → **Settings** → **Domains**.
2. Přidejte doménu **reamar.cz** (a případně **www.reamar.cz**).
3. U registrátora domény nastavte DNS podle návodu Vercelu (obvykle A záznam nebo CNAME na Vercel). Vercel u každé domény ukáže přesné hodnoty.

---

## Shrnutí

| Krok | Kde | Co |
|------|-----|-----|
| 1 | github.com/new | Vytvořit nový repozitář |
| 2 | Terminál | `git remote add origin …` a `git push -u origin main` |
| 3 | vercel.com | Import projektu z GitHubu → Deploy |
| 4 | Vercel → Domains | Přidat reamar.cz a nastavit DNS |

Až budete mít vytvořený repozitář na GitHubu, pošlete mi jeho URL (nebo své GitHub uživatelské jméno) a můžu vám sem napsat přesný příkaz `git remote add origin …` pro váš případ.
