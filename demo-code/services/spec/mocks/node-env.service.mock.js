// spec/mocks/node-env.service.mock.js

export const nodeEnvService = {
  argv: ['/bin/node', '/index.js', 'test-argv[2]'],

  readFileSync: () => 'test readFileSync',
}

export function callsreadFileSync(testSubject, calledWith) {
  it('calls nodeEnvService.readFileSync', () => {
    const spy = spyOn(nodeEnvService, 'readFileSync').and.callThrough()

    testSubject()

    if (calledWith?.length > 0) {
      expect(spy).toHaveBeenCalledWith(...calledWith)
    } else {
      expect(spy).toHaveBeenCalled()
    }
  })
}
