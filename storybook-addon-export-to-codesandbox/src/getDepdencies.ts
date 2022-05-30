export type PackageDependencies = { [dependencyName: string]: string };

/**
 *
 * @param fileContent - code
 * @param requiredDependencies - whose versions will override those found in the code
 * @returns - Map of dependencies and their versions to include in package.json
 */
export const getDependencies = (fileContent: string, requiredDependencies: PackageDependencies) => {
  const matches = fileContent.matchAll(/import .* from ['"](.*?)['"];/g);

  const dependenciesInCode = Array.from(matches).reduce((dependencies, match) => {
    if (!match[1].startsWith('react/')) {
      const dependency = parsePackageName(match[1]).name;

      if (!dependencies.hasOwnProperty(dependency)) {
        dependencies[dependency] = requiredDependencies[dependency] ?? 'latest';
      }
    }

    return dependencies;
  }, {} as PackageDependencies);

  return dependenciesInCode;
};

// Parsed a scoped package name into name, version, and path.
const RE_SCOPED = /^(@[^\/]+\/[^@\/]+)(?:@([^\/]+))?(\/.*)?$/;
// Parsed a non-scoped package name into name, version, path
const RE_NON_SCOPED = /^([^@\/]+)(?:@([^\/]+))?(\/.*)?$/;

function parsePackageName(input: string) {
  const m = RE_SCOPED.exec(input) || RE_NON_SCOPED.exec(input);

  if (!m) {
    throw new Error(`[parse-package-name] invalid package name: ${input}`);
  }

  return {
    name: m[1] || '',
    version: m[2] || 'latest',
    path: m[3] || '',
  };
}
