# City Finder

City Finder is a browser-based game created with React. The goal is to pinpoint the location of certain U.S. Cities on a blank map as accurately as possible.

[Click to play!](https://leoxu1.github.io/cityfinder)

## Standard Mode
Standard Mode is the original form of the game. There are ten rounds, and for each round you need to pinpoint the location of one city.
Click the map to guess, and click submit to submit your answer. The distance (in kilometers) between your guess and the actual location of the
city will be added to your Total Distance. Click next to move to the next round. Try to minimize your total distance! 

<img width="800" alt="standardmode" src="https://user-images.githubusercontent.com/15039674/210157015-70c9e45d-ece4-4c51-b25d-1a738737a873.png">

Once you have completed ten rounds, you will be able to see a list of all of your guesses. You may click on the entries of the list to review
each individual guess, if you wish.

<img width="800" alt="resultspage" src="https://user-images.githubusercontent.com/15039674/210157019-ab2b8957-33aa-4782-9f6b-711650fd7422.png">

## Survival Mode
Survival Mode adds a challenge to the game. For each round, the distance between your guess and the actual location of the city must be less
than a threshold. If you get within the threshold, a point will be added to your score. If you fail, you will lose a life. You have 5 lives initially. 
After your score reaches a certain point, you will advance to the next level, which will be more difficult. Additionally, for the first three levels,
you will earn a bonus life if your guess is within half of the threshold or closer. The game ends when you run out of lives.
Detailed instructions about each level are explained within the game.

<img width="800" alt="survivalmode" src="https://user-images.githubusercontent.com/15039674/210177576-da09995d-7afe-4655-9dae-55811f77f8fe.png">

<img width="800" alt="survivalresults" src="https://user-images.githubusercontent.com/15039674/210177623-5dcf174d-b081-4de2-a8a3-f1d480dbee98.png">
