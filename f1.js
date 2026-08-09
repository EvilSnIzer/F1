
        'use strict';

        /* ============================================================
           DATA — 2026 season, as of the Hungarian Grand Prix (R11/22)
           ============================================================ */
        const SEASON = {
            year: 2026,
            totalRounds: 22,
            completedRounds: 11,
            lastRace: 'Hungarian Grand Prix',
            lastRaceDate: '26 July 2026'
        };

        const NEXT_RACE = {
            round: 12,
            name: 'Dutch Grand Prix',
            circuit: 'Circuit Zandvoort',
            country: 'Netherlands',
            start: '2026-08-23T13:00:00Z'   // race start, Sunday 23 Aug 2026
        };

        /* Constructor data — order follows the current 2026 championship */
        const teams = [
            {
                key: 'mercedes', code: 'MER', c1: '#00d2be', c2: '#007d8a', img: 'mercedes.webp',
                name: 'Mercedes-AMG Petronas F1 Team', short: 'Mercedes',
                founded: 2010, base: 'Brackley, United Kingdom',
                principal: 'Toto Wolff', engine: 'Mercedes',
                championships: 8, winsLifetime: '130+',
                pos: 1, points: 379, bestFinish: '1st — 8 wins',
                drivers: ['Kimi Antonelli', 'George Russell'],
                history: 'Mercedes returned to F1 as a constructor in 2010, taking over champions Brawn GP, and then rewrote the record books — winning eight consecutive constructors\u2019 titles from 2014 to 2021. After a lean couple of years, the new 2026 regulations put Mercedes back on top, with rookie Kimi Antonelli leading the world championship and George Russell chipping in two wins.',
                milestones: ['2010 — Return to F1 as a constructor', '2014–2021 — 8 consecutive constructors\u2019 titles', '2014–2020 — 7 straight drivers\u2019 titles (Hamilton, Rosberg)', '2026 — Antonelli leads the championship mid-season']
            },
            {
                key: 'ferrari', code: 'FER', c1: '#e8002d', c2: '#7a0016', img: 'ferrari.jpg',
                name: 'Scuderia Ferrari HP', short: 'Ferrari',
                founded: 1950, base: 'Maranello, Italy',
                principal: 'Frédéric Vasseur', engine: 'Ferrari',
                championships: 16, winsLifetime: '250+',
                pos: 2, points: 307, bestFinish: '1st — 2 wins',
                drivers: ['Lewis Hamilton', 'Charles Leclerc'],
                history: 'The oldest and most successful name in Formula 1, competing since the very first world championship season in 1950. Ferrari remains the sport\u2019s most iconic team, with 16 constructors\u2019 titles and a fanbase like no other. In 2025 the Scuderia signed seven-time champion Lewis Hamilton to partner Charles Leclerc, and in 2026 the pairing has delivered two wins and a serious title challenge.',
                milestones: ['1950 — Founding member of the F1 world championship', '16 constructors\u2019 titles — most in F1 history', '2025 — Hamilton joins from Mercedes', '2026 — Wins in Spain (Hamilton) & Britain (Leclerc)']
            },
            {
                key: 'mclaren', code: 'MCL', c1: '#ff8000', c2: '#b34700', img: 'mclaren.jpg',
                name: 'McLaren Formula 1 Team', short: 'McLaren',
                founded: 1966, base: 'Woking, United Kingdom',
                principal: 'Andrea Stella', engine: 'Mercedes',
                championships: 9, winsLifetime: '190+',
                pos: 3, points: 220, bestFinish: '1st — Norris, Hungary',
                drivers: ['Lando Norris', 'Oscar Piastri'],
                history: 'Founded by Bruce McLaren in 1966, the Woking team has claimed nine constructors\u2019 titles with legends like Emerson Fittipaldi, Ayrton Senna, Alain Prost and Mika Häkkinen. After a long rebuild, McLaren returned to the summit in 2025 — taking the constructors\u2019 title with Lando Norris crowned world champion.',
                milestones: ['1966 — Founded by Bruce McLaren', '1988 — 15 wins from 16 races with Senna & Prost', '1998 — Häkkinen wins the drivers\u2019 title', '2025 — Constructors\u2019 title & Norris becomes champion']
            },
            {
                key: 'redbull', code: 'RBR', c1: '#3671c6', c2: '#0f1b4c', img: 'redbull.jpg',
                name: 'Oracle Red Bull Racing', short: 'Red Bull Racing',
                founded: 2005, base: 'Milton Keynes, United Kingdom',
                principal: 'Laurent Mekies', engine: 'Red Bull Ford',
                championships: 6, winsLifetime: '120+',
                pos: 4, points: 177, bestFinish: '2nd — Verstappen, Austria',
                drivers: ['Max Verstappen', 'Isack Hadjar'],
                history: 'Red Bull bought Jaguar Racing in 2005 and built a title machine. Four straight titles with Sebastian Vettel (2010–13) were followed by a new era of dominance with Max Verstappen, who took four consecutive drivers\u2019 crowns from 2021 to 2024. In 2026 Laurent Mekies took over from Christian Horner, and Isack Hadjar stepped up alongside Verstappen.',
                milestones: ['2005 — Entry into F1 with the Jaguar takeover', '2010–2013 — 4 titles with Sebastian Vettel', '2021–2024 — 4 titles with Max Verstappen', '2026 — New leadership: Laurent Mekies as team principal']
            },
            {
                key: 'rb', code: 'RB', c1: '#1c3f8f', c2: '#a61b29', img: 'rb.jpg',
                name: 'Visa Cash App Racing Bulls', short: 'Racing Bulls',
                founded: 2006, base: 'Faenza, Italy',
                principal: 'Alan Permane', engine: 'Red Bull Ford',
                championships: 0, winsLifetime: '0',
                pos: 5, points: 66, bestFinish: '6th — Lawson, ×3',
                drivers: ['Liam Lawson', 'Arvid Lindblad'],
                history: 'Born as Scuderia Toro Rosso in 2006, the Faenza squad became the young-driver finishing school of the Red Bull family — Sebastian Vettel and Max Verstappen both scored their first wins here. Rebranded for 2026 as Racing Bulls, the team fields Liam Lawson and rookie Arvid Lindblad, the only new face on the grid this season.',
                milestones: ['2006 — Debut as Scuderia Toro Rosso', '2008 — Vettel wins the Italian GP for Toro Rosso', '2016 — Verstappen\u2019s first F1 win at Barcelona', '2026 — Rookie Lindblad joins the grid']
            },
            {
                key: 'alpine', code: 'ALP', c1: '#0093cc', c2: '#f064b6', img: 'alpine.jpg',
                name: 'BWT Alpine F1 Team', short: 'Alpine',
                founded: 2021, base: 'Enstone, United Kingdom',
                principal: 'Flavio Briatore & Steve Nielsen', engine: 'Mercedes',
                championships: 2, winsLifetime: '23',
                pos: 6, points: 61, bestFinish: '3rd — Gasly, Monaco',
                drivers: ['Pierre Gasly', 'Franco Colapinto'],
                history: 'The Enstone team\u2019s lineage runs through Benetton and Renault — winning championships with Michael Schumacher and Fernando Alonso. Rebranded as Alpine in 2021, the team switched to customer Mercedes engines under the 2026 regulations and has shown solid midfield form, with Pierre Gasly scoring a podium in Monaco.',
                milestones: ['1995–2005 — Titles as Benetton & Renault', '2005–2006 — Double constructors\u2019 titles as Renault', '2021 — Rebranded as Alpine', '2026 — Switch to Mercedes power units']
            },
            {
                key: 'haas', code: 'HAA', c1: '#e5e5e5', c2: '#8f0f14', img: 'haas.jpg',
                name: 'Haas F1 Team', short: 'Haas',
                founded: 2016, base: 'Kannapolis, USA / Banbury, UK',
                principal: 'Ayao Komatsu', engine: 'Ferrari',
                championships: 0, winsLifetime: '0',
                pos: 7, points: 21, bestFinish: '5th — Bearman, China',
                drivers: ['Esteban Ocon', 'Oliver Bearman'],
                history: 'Haas became the first American-led F1 team since the 1980s when it joined in 2016, pioneering the "buy, don\u2019t build" model with heavy Ferrari support. Now run by Japanese team principal Ayao Komatsu, the team counts on British youngster Oliver Bearman and French veteran Esteban Ocon to keep pushing into the points.',
                milestones: ['2016 — First American-led team since the 1980s', '2018 — 5th in the constructors\u2019 championship', '2024 — Bearman debuts as a Ferrari stand-in', '2026 — Esteban Ocon joins the lineup']
            },
            {
                key: 'audi', code: 'AUD', c1: '#e30613', c2: '#3b3b3b', img: 'audi.jpg',
                name: 'Audi F1 Team', short: 'Audi',
                founded: 2026, base: 'Hinwil, Switzerland',
                principal: 'Jonathan Wheatley', engine: 'Audi',
                championships: 0, winsLifetime: '0',
                pos: 8, points: 12, bestFinish: '8th — Bortoleto, ×2',
                drivers: ['Gabriel Bortoleto', 'Nico Hülkenberg'],
                history: 'Audi took over the Sauber operation and made its works F1 debut in 2026 with its own power unit — one of the big stories of the new regulations era. Brazilian rookie Gabriel Bortoleto, the 2024 F2 champion, has impressed with two 8th-place finishes, while veteran Nico Hülkenberg adds experience.',
                milestones: ['2026 — Works debut with an Audi power unit', 'Hinwil base inherited from Sauber (since 1993)', '2026 — Bortoleto scores Audi\u2019s first points']
            },
            {
                key: 'williams', code: 'WIL', c1: '#005aff', c2: '#041e42', img: 'williams.jpg',
                name: 'Atlassian Williams Racing', short: 'Williams',
                founded: 1977, base: 'Grove, United Kingdom',
                principal: 'James Vowles', engine: 'Mercedes',
                championships: 9, winsLifetime: '114',
                pos: 9, points: 11, bestFinish: '8th — Albon, Monaco',
                drivers: ['Carlos Sainz', 'Alexander Albon'],
                history: 'Founded by Sir Frank Williams in 1977, Williams is one of the great names of the sport — nine constructors\u2019 titles and 114 race wins with legends like Alan Jones, Nelson Piquet, Nigel Mansell and Ayrton Senna. Under James Vowles, the Grove squad is rebuilding with Carlos Sainz and Alex Albon at the wheel.',
                milestones: ['1977 — Founded by Sir Frank Williams', '1980–1997 — 9 constructors\u2019 titles', '114 grand prix victories', '2025 — Sainz joins alongside Albon']
            },
            {
                key: 'aston', code: 'AMR', c1: '#00a06a', c2: '#005c3e', img: 'aston.jpg',
                name: 'Aston Martin Aramco F1 Team', short: 'Aston Martin',
                founded: 2021, base: 'Silverstone, United Kingdom',
                principal: 'Adrian Newey', engine: 'Honda',
                championships: 0, winsLifetime: '1',
                pos: 10, points: 1, bestFinish: '10th — Alonso, Monaco',
                drivers: ['Fernando Alonso', 'Lance Stroll'],
                history: 'Aston Martin returned to F1 in 2021 after a 61-year absence, rebranding from Racing Point. The Silverstone team has poured investment into a new factory and staff, and in 2025 landed legendary designer Adrian Newey, who now leads the team into the new regulations era with Honda power.',
                milestones: ['2021 — Return to F1 after 61 years away', '2023 — 8 podiums with Fernando Alonso', '2025 — Adrian Newey joins the project', '2026 — Factory Honda power units']
            },
            {
                key: 'cadillac', code: 'CAD', c1: '#c8b273', c2: '#1b1b1b', img: 'cadillac.jpg',
                name: 'Cadillac Formula 1 Team', short: 'Cadillac',
                founded: 2026, base: 'Fishers, USA / Silverstone, UK',
                principal: 'Graeme Lowdon', engine: 'Ferrari',
                championships: 0, winsLifetime: '0',
                pos: 11, points: 0, bestFinish: '13th — Bottas, China',
                drivers: ['Valtteri Bottas', 'Sergio Pérez'],
                history: 'Cadillac became F1\u2019s 11th team in 2026 — the first new American entry since 2016. Backed by General Motors with Ferrari engines for its debut season, the team fields two hugely experienced drivers: Valtteri Bottas and Sergio Pérez, both multiple grand prix winners.',
                milestones: ['2026 — F1 debut as the 11th team', 'First American-owned works entry since 1986', '2026 — Ferrari power units for the first season', 'Drivers: 20 career wins between Bottas & Pérez']
            }
        ];

        /* Driver data — ranked by 2026 championship position */
        const drivers = [
            { name: 'Kimi Antonelli', team: 'mercedes', country: 'IT', flag: '🇮🇹', num: 12, pos: 1, pts: 219, wins: 6, titles: 0, img: 'kimi-antonelli.png' },
            { name: 'Lewis Hamilton', team: 'ferrari', country: 'GB', flag: '🇬🇧', num: 44, pos: 2, pts: 169, wins: 1, titles: 7, img: 'lewis-hamilton.png' },
            { name: 'George Russell', team: 'mercedes', country: 'GB', flag: '🇬🇧', num: 63, pos: 3, pts: 160, wins: 2, titles: 0, img: 'george-russell.jpg' },
            { name: 'Charles Leclerc', team: 'ferrari', country: 'MC', flag: '🇲🇨', num: 16, pos: 4, pts: 138, wins: 1, titles: 0, img: 'charles-leclerc.jpg' },
            { name: 'Lando Norris', team: 'mclaren', country: 'GB', flag: '🇬🇧', num: 1, pos: 5, pts: 128, wins: 1, titles: 1, img: 'lando-norris.jpg' },
            { name: 'Max Verstappen', team: 'redbull', country: 'NL', flag: '🇳🇱', num: 3, pos: 6, pts: 109, wins: 0, titles: 4, img: 'max-verstappen.jpg' },
            { name: 'Oscar Piastri', team: 'mclaren', country: 'AU', flag: '🇦🇺', num: 81, pos: 7, pts: 92, wins: 0, titles: 0, img: 'oscar-piastri.jpg' },
            { name: 'Isack Hadjar', team: 'redbull', country: 'FR', flag: '🇫🇷', num: 6, pos: 8, pts: 68, wins: 0, titles: 0, img: 'isack-hadjar.jpg' },
            { name: 'Liam Lawson', team: 'rb', country: 'NZ', flag: '🇳🇿', num: 30, pos: 9, pts: 43, wins: 0, titles: 0, img: 'liam-lawson.jpg' },
            { name: 'Pierre Gasly', team: 'alpine', country: 'FR', flag: '🇫🇷', num: 10, pos: 10, pts: 42, wins: 0, titles: 0, img: 'pierre-gasly.webp' },
            { name: 'Arvid Lindblad', team: 'rb', country: 'GB', flag: '🇬🇧', num: 41, pos: 11, pts: 23, wins: 0, titles: 0, img: 'arvid-lindblad.jpg' },
            { name: 'Franco Colapinto', team: 'alpine', country: 'AR', flag: '🇦🇷', num: 43, pos: 12, pts: 19, wins: 0, titles: 0, img: 'franco-colapinto.jpg' },
            { name: 'Oliver Bearman', team: 'haas', country: 'GB', flag: '🇬🇧', num: 87, pos: 13, pts: 18, wins: 0, titles: 0, img: 'oliver-bearman.jpg' },
            { name: 'Gabriel Bortoleto', team: 'audi', country: 'BR', flag: '🇧🇷', num: 5, pos: 14, pts: 10, wins: 0, titles: 0, img: 'gabriel-bortoleto.webp' },
            { name: 'Carlos Sainz', team: 'williams', country: 'ES', flag: '🇪🇸', num: 55, pos: 15, pts: 6, wins: 0, titles: 0, img: 'carlos-sainz.jpg' },
            { name: 'Alexander Albon', team: 'williams', country: 'TH', flag: '🇹🇭', num: 23, pos: 16, pts: 5, wins: 0, titles: 0, img: 'alexander-albon.jpg' },
            { name: 'Esteban Ocon', team: 'haas', country: 'FR', flag: '🇫🇷', num: 31, pos: 17, pts: 3, wins: 0, titles: 0, img: 'esteban-ocon.webp' },
            { name: 'Nico Hülkenberg', team: 'audi', country: 'DE', flag: '🇩🇪', num: 27, pos: 18, pts: 2, wins: 0, titles: 0, img: 'nico-hulkenberg.webp' },
            { name: 'Fernando Alonso', team: 'aston', country: 'ES', flag: '🇪🇸', num: 14, pos: 19, pts: 1, wins: 0, titles: 2, img: 'fernando-alonso.jpg' },
            { name: 'Lance Stroll', team: 'aston', country: 'CA', flag: '🇨🇦', num: 18, pos: 20, pts: 0, wins: 0, titles: 0, img: 'lance-stroll.jpg' },
            { name: 'Valtteri Bottas', team: 'cadillac', country: 'FI', flag: '🇫🇮', num: 77, pos: 21, pts: 0, wins: 0, titles: 0, img: 'valtteri-bottas.jpg' },
            { name: 'Sergio Pérez', team: 'cadillac', country: 'MX', flag: '🇲🇽', num: 11, pos: 22, pts: 0, wins: 0, titles: 0, img: 'sergio-perez.jpg' }
        ];

        /* 2026 race winners, rounds 1–11 */
        const winners = [
            { gp: 'Australia', winner: 'Russell' },
            { gp: 'China', winner: 'Antonelli' },
            { gp: 'Japan', winner: 'Antonelli' },
            { gp: 'Miami', winner: 'Antonelli' },
            { gp: 'Canada', winner: 'Antonelli' },
            { gp: 'Monaco', winner: 'Antonelli' },
            { gp: 'Spain', winner: 'Hamilton' },
            { gp: 'Austria', winner: 'Russell' },
            { gp: 'Britain', winner: 'Leclerc' },
            { gp: 'Belgium', winner: 'Antonelli' },
            { gp: 'Hungary', winner: 'Norris' }
        ];

        /* Remaining 2026 calendar, rounds 12–22 */
        const calendar = [
            { round: 12, name: 'Dutch Grand Prix', circuit: 'Circuit Zandvoort', dates: 'Aug 21–23', sprint: true, raceDate: '2026-08-23T13:00:00Z' },
            { round: 13, name: 'Italian Grand Prix', circuit: 'Autodromo Nazionale Monza', dates: 'Sep 4–6', sprint: false },
            { round: 14, name: 'Spanish Grand Prix', circuit: 'Madring, Madrid', dates: 'Sep 11–13', sprint: false },
            { round: 15, name: 'Azerbaijan Grand Prix', circuit: 'Baku City Circuit', dates: 'Sep 24–26', sprint: false },
            { round: 16, name: 'Bahrain Grand Prix', circuit: 'Sepang International Circuit', dates: 'Oct 2–4', sprint: false },
            { round: 17, name: 'Singapore Grand Prix', circuit: 'Marina Bay Street Circuit', dates: 'Oct 9–11', sprint: true },
            { round: 18, name: 'United States Grand Prix', circuit: 'Circuit of the Americas', dates: 'Oct 23–25', sprint: false },
            { round: 19, name: 'Mexican Grand Prix', circuit: 'Autódromo Hermanos Rodríguez', dates: 'Oct 30 – Nov 1', sprint: false },
            { round: 20, name: 'Brazilian Grand Prix', circuit: 'Interlagos, São Paulo', dates: 'Nov 6–8', sprint: false },
            { round: 21, name: 'Las Vegas Grand Prix', circuit: 'Las Vegas Strip Circuit', dates: 'Nov 19–21', sprint: false },
            { round: 22, name: 'Qatar Grand Prix', circuit: 'Losail International Circuit', dates: 'Nov 27–29', sprint: false }
        ];

        const stats = [
            { icon: '🏁', count: 22, desc: 'Rounds This Season' },
            { icon: '🏎️', count: 11, desc: 'Teams On The Grid' },
            { icon: '👨‍✈️', count: 22, desc: 'Active Drivers' },
            { icon: '🏆', count: 5, desc: 'Different Winners' },
            { icon: '🌍', count: 19, desc: 'Countries Visited' },
            { icon: '⚡', count: 379, desc: 'Leader\u2019s Points (Mercedes)' }
        ];

        /* ============================================================
           HELPERS
           ============================================================ */
        const $ = (sel) => document.querySelector(sel);
        const teamOf = (key) => teams.find(t => t.key === key);

        function esc(s) {
            return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
        }

        /* Build the CSS-drawn car artwork (shared by cards & modal) */
        function carArt(c1, c2, num) {
            return `
                <div class="f1car">
                    <div class="shadow"></div>
                    <div class="body"></div>
                    <div class="frontwing"></div>
                    <div class="rearwing"></div>
                    <div class="cockpit"></div>
                    <div class="halo"></div>
                    <div class="wheel w-fl"></div>
                    <div class="wheel w-fr"></div>
                    <div class="wheel w-rl"></div>
                    <div class="wheel w-rr"></div>
                    ${num ? `<div class="numplate">#${num}</div>` : ''}
                </div>`;
        }

        /* ============================================================
           RENDER — Standings
           ============================================================ */
        function renderStandings() {
            const ds = $('#driversStanding');
            const top = drivers.slice(0, 10);
            const maxPts = top[0].pts;
            ds.innerHTML = top.map(d => {
                const t = teamOf(d.team);
                return `
                    <div class="s-row ${d.pos === 1 ? 'leader' : ''}">
                        <span class="pos">${d.pos}</span>
                        <div class="who">
                            <span class="dot" style="background:${t.c1}; color:${t.c1};"></span>
                            <div>
                                <div class="name">${esc(d.name)} <span style="font-size:.85rem;">${d.flag}</span></div>
                                <div class="team">${esc(t.short)}</div>
                            </div>
                        </div>
                        <div class="pts">${d.pts}<small>${d.wins > 0 ? d.wins + ' win' + (d.wins > 1 ? 's' : '') : 'pts'}</small></div>
                    </div>`;
            }).join('');

            const ts = $('#teamsStanding');
            const sorted = [...teams].sort((a, b) => a.pos - b.pos);
            const maxTeamPts = sorted[0].points;
            ts.innerHTML = sorted.map(t => {
                const pct = Math.max((t.points / maxTeamPts) * 100, 2);
                return `
                    <div class="s-row ${t.pos === 1 ? 'leader' : ''}">
                        <span class="pos">${t.pos}</span>
                        <div class="who">
                            <span class="dot" style="background:${t.c1}; color:${t.c1};"></span>
                            <div>
                                <div class="name">${esc(t.short)}</div>
                                <div class="team">${esc(t.drivers[0])} / ${esc(t.drivers[1])}</div>
                            </div>
                        </div>
                        <div class="pts">${t.points}<small>pts</small></div>
                    </div>`;
            }).join('');

            $('#winnersStrip').innerHTML = winners.map(w =>
                `<span class="winner-chip"><b>${esc(w.winner)}</b> · <span class="gp">${esc(w.gp)} GP</span></span>`
            ).join('');
        }

        /* ============================================================
           RENDER — Teams
           ============================================================ */
        function renderTeams() {
            const sorted = [...teams].sort((a, b) => a.pos - b.pos);
            $('#teamsGrid').innerHTML = sorted.map((t, i) => `
                <article class="team-card reveal" style="--c1:${t.c1}; --c2:${t.c2}; transition-delay:${(i % 3) * 0.08}s"
                         data-team="${t.key}" tabindex="0"
                         role="button" aria-label="Open ${esc(t.name)} details">
                    <div class="top-row">
                        <div class="team-badge">${esc(t.code)}</div>
                        <div class="titles">
                            <h3>${esc(t.name)}</h3>
                            <span class="pos-chip">${t.pos}${ordinal(t.pos)} · ${t.points} pts</span>
                        </div>
                    </div>
                    <div class="car">
                        <img src="images/teams/${t.img}" alt="${esc(t.short)} 2026 F1 car"
                             loading="lazy" width="600" height="340">
                        <div class="car-fallback-art">${carArt(t.c1, t.c2, t.code)}</div>
                    </div>
                    <div class="meta">
                        <div><div class="m">Drivers</div><div class="v">${esc(t.drivers[0])}</div></div>
                        <div><div class="m">&nbsp;</div><div class="v">${esc(t.drivers[1])}</div></div>
                        <div><div class="m">Team Principal</div><div class="v">${esc(t.principal)}</div></div>
                        <div><div class="m">Power Unit</div><div class="v">${esc(t.engine)}</div></div>
                    </div>
                    <div class="open-hint">View Details ▸</div>
                </article>
            `).join('');
        }

        function ordinal(n) {
            const s = ['th', 'st', 'nd', 'rd'];
            const v = n % 100;
            return s[(v - 20) % 10] || s[v] || s[0];
        }

        /* ============================================================
           RENDER — Drivers
           ============================================================ */
        function renderDrivers() {
            $('#driversGrid').innerHTML = drivers.map((d, i) => {
                const t = teamOf(d.team);
                return `
                    <article class="driver-card reveal" style="--c1:${t.c1}; --c2:${t.c2}; transition-delay:${(i % 4) * 0.06}s">
                        <span class="num">#${d.num}</span>
                        <div class="davatar" data-name="${esc(d.name)}">
                            <img src="images/drivers/${d.img}" alt="${esc(d.name)}"
                                 loading="lazy" width="136" height="136">
                        </div>
                        <h3>${esc(d.name)} ${esc(d.flag)}</h3>
                        <div class="dteam">${esc(t.short)}</div>
                        <div class="dstats">
                            <div class="ds"><div class="n">${d.pos}</div><div class="t">Position</div></div>
                            <div class="ds"><div class="n">${d.pts}</div><div class="t">Points</div></div>
                            <div class="ds"><div class="n">${d.wins}</div><div class="t">Wins</div></div>
                        </div>
                    </article>`;
            }).join('');
        }

        function initials(name) {
            return name.split(' ').map(w => w[0]).join('').replace(/[^A-Z]/g, '');
        }

        /* ============================================================
           RENDER — Calendar
           ============================================================ */
        function renderCalendar() {
            const next = NEXT_RACE;
            $('#nextCard').innerHTML = `
                <div>
                    <div class="k">Up Next · Round ${next.round} of ${SEASON.totalRounds}</div>
                    <h3>${esc(next.name)}</h3>
                    <div class="circuit">${esc(next.circuit)} · ${esc(next.country)} · ${esc(calendar[0].dates)}</div>
                    <span class="tag">${formatRaceDate(next.start)}</span>
                </div>
                <div class="cd" id="nextCd">
                    <div class="cd-cell"><div class="num" id="ncD">--</div><div class="lbl">Days</div></div>
                    <div class="cd-cell"><div class="num" id="ncH">--</div><div class="lbl">Hours</div></div>
                    <div class="cd-cell"><div class="num" id="ncM">--</div><div class="lbl">Min</div></div>
                    <div class="cd-cell"><div class="num" id="ncS">--</div><div class="lbl">Sec</div></div>
                </div>`;

            $('#calendarList').innerHTML = calendar.map(r => `
                <div class="race-row ${r.round === next.round ? 'next' : ''}">
                    <span class="rd">R${r.round}</span>
                    <div>
                        <div class="rname">${esc(r.name)}</div>
                        <div class="rcircuit">${esc(r.circuit)}</div>
                    </div>
                    ${r.sprint ? '<span class="sprint-tag">Sprint</span>' : '<span></span>'}
                    <span class="rdate">${esc(r.dates)}</span>
                </div>
            `).join('');
        }

        function formatRaceDate(iso) {
            return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        }

        /* ============================================================
           RENDER — Stats (with count-up)
           ============================================================ */
        function renderStats() {
            $('#statsGrid').innerHTML = stats.map((s, i) => `
                <div class="stat-card reveal" style="transition-delay:${(i % 3) * 0.07}s">
                    <div class="s-icon">${esc(s.icon)}</div>
                    <div class="s-num" data-count="${s.count}">0</div>
                    <div class="s-desc">${esc(s.desc)}</div>
                </div>
            `).join('');
        }

        /* ============================================================
           RENDER — Modal
           ============================================================ */
        function openTeamModal(key) {
            const t = teamOf(key);
            if (!t) return;
            const modal = $('#teamModal');
            const prevFocus = document.activeElement;
            modal.dataset.prevFocus = prevFocus ? prevFocus.id || prevFocus.className || '' : '';

            $('#modalHead').style.setProperty('--mc1', t.c1);
            $('#modalHead').style.setProperty('--mc2', t.c2);
            $('#modalBadge').textContent = t.code;
            $('#modalBadge').style.background = `linear-gradient(135deg, ${t.c1}, ${t.c2})`;
            $('#modalTitle').textContent = t.name;
            $('#modalPill').textContent = `${t.pos}${ordinal(t.pos)} · ${t.points} pts`;

            /* Overview tab */
            $('#overviewGrid').innerHTML = `
                ${infoCell('Founded', t.founded)}
                ${infoCell('Base', t.base)}
                ${infoCell('Team Principal', t.principal)}
                ${infoCell('Power Unit', t.engine)}
                ${infoCell('Drivers', t.drivers[0] + ' · ' + t.drivers[1])}
                ${infoCell('Constructors\u2019 Titles', t.championships)}
            `;

            /* Car tab */
            $('#modalCar').setAttribute('data-team', t.key);
            $('#modalCar').innerHTML = `
                <img src="images/teams/${t.img}" alt="${esc(t.short)} 2026 F1 car"
                     loading="lazy" width="800" height="450">
            `;
            $('#carSpecs').innerHTML = `
                <h4>2026 Specification</h4>
                <ul>
                    <li><b>Power unit:</b> ${esc(t.engine)} — 1.0L V6 turbo-hybrid, ~1000 hp with a 50/50 ICE/electric split</li>
                    <li><b>Fuel:</b> 100% sustainable fuel, mandated under the new regulations</li>
                    <li><b>Chassis:</b> New-generation 2026 ground-effect cars with active aerodynamics</li>
                    <li><b>Weight:</b> 768 kg minimum (down ~30 kg on 2025)</li>
                    <li><b>Tyres:</b> Pirelli 18-inch — front 280mm, rear 360mm</li>
                </ul>`;

            /* History tab */
            $('#historyText').innerHTML = esc(t.history).replace(/\n/g, '<br>');
            $('#milestones').innerHTML = t.milestones.map(m => `<li><b>${esc(m)}</b></li>`).join('');

            /* Season tab */
            $('#seasonStats').innerHTML = `
                <div class="season-stat"><div class="n">${t.pos}</div><div class="t">2026 Position</div></div>
                <div class="season-stat"><div class="n">${t.points}</div><div class="t">2026 Points</div></div>
                <div class="season-stat"><div class="n">${esc(t.bestFinish)}</div><div class="t">Best Finish</div></div>
                <div class="season-stat"><div class="n">${t.championships}</div><div class="t">Titles (All Time)</div></div>
                <div class="season-stat"><div class="n">${esc(t.winsLifetime)}</div><div class="t">GP Wins</div></div>
            `;

            /* Reset tabs to overview */
            document.querySelectorAll('.mtab').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.mtabpane').forEach(p => p.classList.remove('active'));
            document.querySelector('.mtab').classList.add('active');
            $('#pane-overview').classList.add('active');

            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            $('#modalClose').focus();
        }

        function infoCell(k, v) {
            return `<div class="ig"><div class="k">${k}</div><div class="v">${esc(String(v))}</div></div>`;
        }

        function closeTeamModal() {
            const modal = $('#teamModal');
            modal.classList.remove('open');
            document.body.style.overflow = '';
            const prev = modal.dataset.prevFocus;
            const target = prev ? document.getElementById(prev) : null;
            if (target) target.focus();
        }

        function initModal() {
            $('#modalClose').addEventListener('click', closeTeamModal);
            modalBackdropClose('#teamModal', closeTeamModal);

            document.querySelectorAll('.mtab').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.mtab').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.mtabpane').forEach(p => p.classList.remove('active'));
                    btn.classList.add('active');
                    $('#pane-' + btn.dataset.tab).classList.add('active');
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeTeamModal();
            });
        }

        /* Close a modal when the backdrop (not the panel) is clicked */
        function modalBackdropClose(modalSel, closeFn) {
            const modal = $(modalSel);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeFn();
            });
        }

        /* ============================================================
           COUNTDOWN
           ============================================================ */
        function initCountdown() {
            const target = new Date(NEXT_RACE.start).getTime();
            const pairs = [
                ['#cdD', '#cdH', '#cdM', '#cdS'],
                ['#ncD', '#ncH', '#ncM', '#ncS']
            ];
            function tick() {
                const diff = target - Date.now();
                const pad = n => String(n).padStart(2, '0');
                let d = Math.floor(diff / 86400000);
                let h = Math.floor(diff / 3600000) % 24;
                let m = Math.floor(diff / 60000) % 60;
                let s = Math.floor(diff / 1000) % 60;
                if (diff < 0) { d = h = m = s = 0; }
                pairs.forEach(([dS, hS, mS, sS]) => {
                    if ($(dS)) { $(dS).textContent = pad(d); $(hS).textContent = pad(h); $(mS).textContent = pad(m); $(sS).textContent = pad(s); }
                });
            }
            tick();
            setInterval(tick, 1000);
        }

        /* ============================================================
           SCROLL REVEAL + COUNT-UP
           ============================================================ */
        function initReveal() {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(en => {
                    if (en.isIntersecting) {
                        en.target.classList.add('in');
                        io.unobserve(en.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            document.querySelectorAll('.reveal').forEach(el => io.observe(el));
        }

        function initCountUp() {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(en => {
                    if (!en.isIntersecting) return;
                    const el = en.target;
                    io.unobserve(el);
                    const target = parseInt(el.dataset.count, 10);
                    const dur = 1400;
                    const t0 = performance.now();
                    function frame(now) {
                        const p = Math.min((now - t0) / dur, 1);
                        const eased = 1 - Math.pow(1 - p, 3);
                        el.textContent = Math.round(target * eased).toLocaleString('en-US');
                        if (p < 1) requestAnimationFrame(frame);
                    }
                    requestAnimationFrame(frame);
                });
            }, { threshold: 0.4 });
            document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
        }

        /* ============================================================
           HEADER / NAV / HERO
           ============================================================ */
        function initChrome() {
            const header = $('#siteHeader');
            const hamburger = $('#hamburger');
            const navLinks = $('#navLinks');

            window.addEventListener('scroll', () => {
                header.classList.toggle('scrolled', window.scrollY > 40);
                const hero = $('#heroContent');
                if (hero && window.scrollY < window.innerHeight) {
                    hero.style.transform = `translateY(${window.scrollY * 0.22}px)`;
                    hero.style.opacity = String(Math.max(1 - window.scrollY / (window.innerHeight * 0.85), 0));
                }
            }, { passive: true });

            hamburger.addEventListener('click', () => {
                const open = navLinks.classList.toggle('open');
                hamburger.classList.toggle('open', open);
                hamburger.setAttribute('aria-expanded', String(open));
            });

            navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }));

            $('#year').textContent = new Date().getFullYear();

            // Event delegation for team cards (no inline handlers)
            const grid = $('#teamsGrid');
            grid.addEventListener('click', (e) => {
                const card = e.target.closest('.team-card');
                if (card) openTeamModal(card.dataset.team);
            });
            grid.addEventListener('keydown', (e) => {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                const card = e.target.closest('.team-card');
                if (card) { e.preventDefault(); openTeamModal(card.dataset.team); }
            });

            // Image fallback via capture-phase error listener (CSP-compatible)
            document.addEventListener('error', (e) => {
                const t = e.target;
                if (!t || t.tagName !== 'IMG') return;
                if (t.closest && t.closest('.team-card')) {
                    const car = t.closest('.car');
                    if (car) car.classList.add('car-fallback');
                    t.remove();
                } else if (t.closest && t.closest('.driver-card')) {
                    const av = t.closest('.davatar');
                    if (av) {
                        av.classList.add('initials');
                        av.textContent = initials(av.dataset.name || '');
                    }
                } else if (t.closest && t.closest('.modal-car')) {
                    const mc = t.closest('.modal-car');
                    const team = mc ? teamOf(mc.getAttribute('data-team')) : null;
                    if (team) mc.insertAdjacentHTML('afterbegin', carArt(team.c1, team.c2, team.code));
                    t.remove();
                }
            }, true);
        }

        /* ============================================================
           INIT
           ============================================================ */
        document.addEventListener('DOMContentLoaded', () => {
            renderStandings();
            renderTeams();
            renderDrivers();
            renderCalendar();
            renderStats();
            initModal();
            initCountdown();
            initReveal();
            initCountUp();
            initChrome();
        });
    