import { threadFunction } from './thread-function';

describe('threadFunction', () => {
  const values = [1, 2, 3, 4, 5];
  const asyncExecutor = async (value: number) => {
    return Promise.resolve(value * 2);
  };
  const numberOfThreads = 2;

  it('should execute asyncExecutor for each value in parallel', async () => {
    const expectedResults = values.map((value) => value * 2);

    await threadFunction(values, asyncExecutor, numberOfThreads);

    expect(asyncExecutor).toHaveBeenCalledTimes(values.length);

    values.forEach((value, index) => {
      expect(asyncExecutor).toHaveBeenNthCalledWith(
        index + 1,
        value
      );
    });

    expect(asyncExecutor.mock.results.map((result) => result.value)).toEqual(
      expectedResults
    );
  });

  it('should handle errors thrown by asyncExecutor', async () => {
    const errorValue = 3;
    const errorMessage = 'AsyncExecutor error';
    jest.spyOn(asyncExecutor, 'mockImplementation').mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await threadFunction(values, asyncExecutor, numberOfThreads);

    expect(asyncExecutor).toHaveBeenCalledTimes(values.length);

    expect(asyncExecutor).toHaveBeenCalledWith(errorValue);

    expect(console.log).toHaveBeenCalledWith(
      new Error(errorMessage)
    );
  });
});
