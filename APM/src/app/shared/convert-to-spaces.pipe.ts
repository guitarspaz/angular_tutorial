import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform{
    transform(value: string, characterToReplace: string): string{
        return value.replace(characterToReplace, ' ');
    } 
}