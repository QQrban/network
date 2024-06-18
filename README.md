# social-network

See project [description](https://github.com/01-edu/public/tree/master/subjects/social-network) and audit [requirements](https://github.com/01-edu/public/tree/master/subjects/social-network/audit).

Project done by kramazan, tvooglai, aburnaz.

Steps:
1. `git clone https://01.kood.tech/git/tvooglai/social-network.git`
2. `cd social-network`
3. `docker compose up`
4. Go to `http://localhost:3000`
5. Register or login to one of example accounts: `tom`, `kurb`, `nipi`, `dani`, `denzel`, `bruce`, `george`, `nick`, `alice`, `tina`, `janja`, `tanya`, `krystina`, `fedor`, `emily`, `emma`, `albert`, `richard`, `max`, `lee`, `vlad`, `maximilian`, `elisabeth`, `paul`. All have emails with pattern `<name>@kood.ee` and password `zaq12wsx`. All belong to some group. Defined groups are: `Developers`, `Climbers`, `Actors`, `Musicians`, `Physicists`, `Saints`, `Politicians`. But of course you can define your own.
6. Have fun.
7. To remove containers: `docker compose down`. To remove also images, use `docker compose down --rmi all -v`.

Frontend was developed from scratch by Kurban and helped by Daniela after she joined our team. Backend was adapted by Toomas from the previous work of @tammiktanar *et al*.
