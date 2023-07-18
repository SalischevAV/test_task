export async function threadFunction<T>(
    values: Array<T>,
    asyncExecutor: (T) => Promise<T>,
    numberOfThreads: number
): Promise<void>{
    const threads = Array.from({ length: numberOfThreads }, (_, index) => index);

    async function runThread(index: number){
        if(index > values.length - 1){
            return
        }
        try{
            await asyncExecutor(values[index])
        } catch(error) {
            console.log(error)
        } finally {
            await asyncExecutor(values[index + numberOfThreads])
        }
       
    }
    threads.forEach(item => runThread(item))
}