export default function chooseName(): string {
    let name: string | null = prompt('your name', '');

    if (typeof name === 'string' && name.length > 0) {
        return name
    } else {
        return 'Stranger'
    }
    
}