// spec/mocks/io.service.mock.js

export const ioService = {
  getFileContents: () => 'test file contents',
}

export function callsgetFileContents(testSubject, calledWith) {
  it('calls ioService.getFileContents', () => {
    const spy = spyOn(ioService, 'getFileContents').and.callThrough()

    testSubject()

    if (calledWith?.length > 0) {
      expect(spy).toHaveBeenCalledWith(...calledWith)
    } else {
      expect(spy).toHaveBeenCalled()
    }
  })
}
