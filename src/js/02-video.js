import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const TIME_PLAYED = "timePlayed";

player.on('timeupdate', throttle((data) => {  
    player.getEnded().then((ended) => {
        if (!ended) {
            localStorage.setItem(TIME_PLAYED, data.seconds);
        } else {
            localStorage.removeItem(TIME_PLAYED);
        }
    });
    }, 1000));

if (localStorage.getItem(TIME_PLAYED)) {
    player.setCurrentTime(localStorage.getItem(TIME_PLAYED));
}
