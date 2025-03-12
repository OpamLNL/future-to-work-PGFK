
class WebkitSpeechRecognizer {
    constructor() {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        if (!SpeechRecognition) {
            console.error('SpeechRecognition is not supported by this browser.');
            return;
        }
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.lang = 'uk-UA';
        this.recognition.maxAlternatives = 1;
        this.isRecognizing = false;

        this.recognition.onend = () => {
            if (this.isRecognizing) {
                this.recognition.start();
            }
        };
    }

    start() {
        if (!this.isRecognizing) {
            this.recognition.start();
            this.isRecognizing = true;
        }
    }

    stop() {
        if (this.isRecognizing) {
            this.recognition.stop();
            this.isRecognizing = false;
        }
    }

    onResult(callback) {
        this.recognition.onresult = function(event) {

            console.log(event.results);
            let result = event.results[0][0].transcript;
            callback(result);
        };
    }

    onError(callback) {
        this.recognition.onerror = function(event) {
            callback('Error occurred in speech recognition: ' + event.error);
        };
    }

    onEnd(callback) {
        this.recognition.onend = function() {
            callback();
        };
    }

}

export default WebkitSpeechRecognizer;
