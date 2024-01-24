export function Top() {
    class Test {
        constructor(name, text, foo){
            this.name = name;
            this.text = text;
            this.foo = foo;
        }
    }

    const test1 = new Test("Test 1", "I am a test", () => {console.log(this.name)})
    const test2 = new Test("Test 2", "I am also a test", () => {console.log(this.text)})
    return(
        <>
            <button onClick={test1.foo}>{test1.name}</button>
            <button onClick={test2.foo}>{test2.name}</button>
        </>
    )
}