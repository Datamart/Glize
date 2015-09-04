
/**
 * @fileoverview Simple HTML5 Audio Recorder.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Simple HTML5 Audio Recorder.
 * @param {!function(AudioProcessingEvent)} onprocess The audio process event
 *     handler.
 * @param {Object=} opt_constraints The optional constraints object.
 * @param {number=} opt_bufferSize The optional buffer size of sample-frames.
 * @constructor
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
 */
media.AudioRecorder = function(onprocess, opt_constraints, opt_bufferSize) {
  opt_bufferSize = opt_bufferSize || 16384;

  /**
   * @param {Object|MediaStream} stream The media stream object.
   * @private
   */
  function onsuccess_(stream) {
    var context = new media.AudioContext;
    var input = context['createMediaStreamSource'](stream);
    var recorder = context['createScriptProcessor'](opt_bufferSize, 1, 1);
    recorder['onaudioprocess'] = onprocess;
    input['connect'](recorder);
    recorder['connect'](context['destination']);
  }

  function init_() {
    media.getUserMedia(
        opt_constraints || {'audio': true, 'video': false},
        onsuccess_, function() {});
  }

  init_();
};
