
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
 * @example
 * new media.AudioRecorder(function(e) {
 *   var data = e.inputBuffer.getChannelData(0);
 *   var data64 = media.toWav64(data);
 *   console.log(data64);
 *   var uri64 = media.toWav64Uri(data);
 *   console.log(uri64);
 * });
 */
media.AudioRecorder = function(onprocess, opt_constraints, opt_bufferSize) {
  opt_bufferSize = opt_bufferSize || 16384;

  /**
   * @return {ScriptProcessorNode} Returns audio recorder processor.
   */
  this.getRecorder = function() {
    return recorder_;
  };

  /**
   * @return {MediaStreamAudioSourceNode} Returns audio stream source.
   */
  this.getSource = function() {
    return source_;
  };

  /**
   * @param {Object|MediaStream} stream The media stream object.
   * @private
   */
  function onsuccess_(stream) {
    var context = new media.AudioContext;
    source_ = context['createMediaStreamSource'](stream);
    recorder_ = context['createScriptProcessor'](opt_bufferSize, 1, 1);
    recorder_['onaudioprocess'] = onprocess;
    source_['connect'](recorder_);
    recorder_['connect'](context['destination']);
  }

  /**
   * @private
   */
  function init_() {
    media.getUserMedia(
        opt_constraints || {'audio': true, 'video': false},
        onsuccess_, function() {});
  }

  /**
   * @type {MediaStreamAudioSourceNode}
   * @private
   */
  var source_;

  /**
   * @type {ScriptProcessorNode}
   * @private
   */
  var recorder_;

  init_();
};
