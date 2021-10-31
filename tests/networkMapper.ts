import { NmapScan } from 'network-mapper'

async function main() {
    const scan = new NmapScan({
        target: '192.168.1.88',
    })

    const result = await scan.run()
    console.log(result)
}

main()
