
/**
 * @fileoverview Defines namespace for media utility methods.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/**
 * Media utility methods.
 * @requires net.URL
 * @requires util.Base64
 * @namespace
 */
var media = {
  /**
   * @type {!Array.<number>}
   * @see https://en.wikipedia.org/wiki/WAV
   */
  WAV_HEADER: [0x52, 0x49, 0x46, 0x46, 0x44, 0x40, 0x00, 0x00, 0x57, 0x41,
               0x56, 0x45, 0x66, 0x6D, 0x74, 0x20, 0x10, 0x00, 0x00, 0x00,
               0x01, 0x00, 0x01, 0x00, 0x44, 0xAC, 0x00, 0x00, 0x44, 0xAC,
               0x00, 0x00, 0x01, 0x00, 0x08, 0x00, 0x64, 0x61, 0x74, 0x61,
               0x00, 0x40],

  /**
   * Prompts the user for permission to use their Web camera or other video or
   * audio input.
   * @param {!Object|MediaStreamConstraints} constraints The object specifying
   *     the types of media to request.
   * @param {!function((Object|MediaStream))} onsuccess The function to invoke
   *     with the resulting MediaStream object if the call succeeds.
   * @param {!function(Object)} onerror The function to invoke with the
   *     resulting MediaStreamError if the call fails.
   * @see http://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
   * @see http://www.w3.org/TR/mediacapture-streams/
   * @see https://w3c.github.io/mediacapture-main/getusermedia.html
   */
  getUserMedia: dom.device['getUserMedia'] ||
      dom.device['webkitGetUserMedia'] ||
      dom.device['mozGetUserMedia'] ||
      dom.device['msGetUserMedia'],

  /**
   * The AudioContext interface represents an audio-processing graph built from
   * audio modules linked together, each represented by an AudioNode.
   * @constructor
   * @see https://developer.mozilla.org/en/docs/Web/API/AudioContext
   * @see http://webaudio.github.io/web-audio-api/#the-audiocontext-interface
   */
  AudioContext: dom.context['AudioContext'] ||
      dom.context['webkitAudioContext'],

  /**
   * Converts audio data to WAV Uint8Array.
   * @param {Float32Array} data The array representing the PCM audio data.
   * @return {!Uint8Array} Returns converted data.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
   * @see https://en.wikipedia.org/wiki/WAV
   */
  toWav: function(data) {
    /** @type {number} */ var i = data.length;
    /** @type {number} */ var length = media.WAV_HEADER.length;
    /** @type {!Uint8Array} */ var result = new Uint8Array(i + length);

    while (i--) {
      result[i + length] = data[i] * 0x7F + 0x80; // Convert to 8 bit.
    }

    while (length--) {
      result[length] = media.WAV_HEADER[length];
    }

    return result;
  },

  /**
   * Converts audio data to WAV encoded to Base64.
   * @param {Float32Array} data The array representing the PCM audio data.
   * @return {string} Returns encoded data.
   * @see media.toWav
   * @see util.Base64.encode
   */
  toWav64: function(data) {
    /** @type {!Uint8Array} */ var wav = media.toWav(data);
    /** @type {string} */ var str = String.fromCharCode.apply(null, wav);
    return util.Base64.encode(str);
  },

  /**
   * Converts audio data to WAV encoded to Base64 data URI.
   * @param {Float32Array} data The array representing the PCM audio data.
   * @return {string} Returns encoded data URI.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs
   * @see media.toWav64
   */
  toWav64Uri: function(data) {
    return 'data:audio/wav;base64,' + media.toWav64(data);
  }
};
