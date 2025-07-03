// Sound manager for the application
export class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private muted: boolean = false;

  constructor() {
    this.initSounds();
    this.loadMuteState();
  }

  private initSounds() {
    // Using online CDN for sound effects
    this.sounds = {
      correct: new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'),
      incorrect: new Audio('https://www.soundjay.com/misc/sounds/fail-buzzer-02.mp3'),
      xp: new Audio('https://www.soundjay.com/misc/sounds/magic-chime-02.mp3'),
      streak: new Audio('https://www.soundjay.com/misc/sounds/success-fanfare-trumpets.mp3')
    };

    // Set volume levels
    Object.values(this.sounds).forEach(sound => {
      sound.volume = 0.3;
      sound.preload = 'auto';
    });
  }

  private loadMuteState() {
    const savedMuteState = localStorage.getItem('duolearno_muted');
    this.muted = savedMuteState === 'true';
  }

  private saveMuteState() {
    localStorage.setItem('duolearno_muted', this.muted.toString());
  }

  play(soundName: string) {
    if (this.muted) return;
    
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.log('Sound play failed:', e));
    }
  }

  toggle() {
    this.muted = !this.muted;
    this.saveMuteState();
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }
}

export const soundManager = new SoundManager();