// spec/mocks/cli.service.mock.js

export const cliService = {
  getFileName: () => 'test file name',
}

export function callsgetFileName(testSubject, calledWith) {
  it('calls cliService.getFileName', () => {
    const spy = spyOn(cliService, 'getFileName').and.callThrough()

    testSubject()

    if (calledWith?.length > 0) {
      expect(spy).toHaveBeenCalledWith(...calledWith)
    } else {
      expect(spy).toHaveBeenCalled()
    }
  })
}
