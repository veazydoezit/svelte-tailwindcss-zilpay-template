<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" class="flex items-center">
            <img src="favicon.png" class="mr-3 h-6 sm:h-10" alt="Alt Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Zilpay+Svelte+Tailwind</span>
        </a>

        {#if network == 'testnet'}
        <button type="button" 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                on:click={connect}>
            {status}
        </button>
        {/if}

        {#if network == 'mainnet'}
        <button type="button" 
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                on:click={connect}>
            {status}
        </button>
        {/if}

        {#if network == ''}
        <button type="button" 
                class="text-white bg-black hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                on:click={connect}>
            {status}
        </button>
        {/if}

    </div>
</nav>

<script>
	
    let status = "Not Connected"
	let base16 = "";
	let bech32 = "";
	let network = "";

	async function connect()
	{
		if(await window.zilPay.wallet.connect())
		{
			const wallet = window.zilPay.wallet
            console.log(window.zilPay.wallet.defaultAccount.bech32)
			base16 = window.zilPay.wallet.defaultAccount.base16
			bech32 = window.zilPay.wallet.defaultAccount.bech32
			network = window.zilPay.wallet.net
            status = bech32
			console.log(`b16 ${base16} // b32 ${bech32} // net ${network}`)
		}
		else
		{

		}
	}

    window.zilPay.wallet.observableAccount().subscribe(function (account) {
        status = account.bech32
    });
    window.zilPay.wallet.observableNetwork().subscribe(function (net) {
        network = net
    });

</script>
