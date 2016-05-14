För att applikationen ska fungera måste Rails API:et vara igång. Starta API:et på address localhost:3000. 

Gå till applikationsroten(position_assignment) för rails i konsolen.

Skriv bundle install

Möjligtvis behöver man köra bundle update om konsolen klagar på fel version av "rake"

Skriv rake db:migrate

Skriv rake db:seed

Starta applikationen. Skriv rails s


Get-funktioner i  applikationen kräver ingen inloggning.

När man ska skapa, uppdater eller ta bort event, taggar eller positioner måste man vara inloggad. 

Är du inte inloggad och försöker navigera till en funktion för att skapa, uppdater eller ta bort kommer du omdirigeras till en inloggningssida. 

Inloggningsuppgifter hittar du i databasen under tabellen creators. Användarnamnet som ska anges hittar du under applikation_name-tabellen och är case sensitive. Lösenordet för dom automatgenererade "creators" är "test". 
