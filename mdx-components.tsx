import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
    
		...components,
		p: (props) => <p {...props} className="prose" />,
		h1: (props) => <h1 {...props} className="prose text-2xl font-bold" />,
		h2: (props) => <h2 {...props} className="prose text-xl font-bold" />,
		h3: (props) => <h3 {...props} className="prose text-lg font-bold" />,
		a: (props) => <a {...props} className="prose text-green-500" />,
		code: (props) => <code {...props} className="prose text-sm lg:text-base" />,
	}
}
