import {
    wrapSelectedItems
  } from 'remirror/extensions';
import {
    ExtensionTag,
    findParentNode,
    PlainExtension
  } from 'remirror';
  
function isListItemNode(node) {
return !!node.type.spec.group?.includes(ExtensionTag.ListItemNode);
}
class ToggleListItemExtension extends PlainExtension {
    constructor() {
      super();
      this.name = 'toggleListItem';
    }
  
    createKeymap() {
      return {
        'Mod-Enter': (props) => {
          return this.toggleListType(props);
        },
      };
    }
  
    toggleListType({ state: { schema }, tr, dispatch }) {
      const foundListItem = findParentNode({
        selection: tr.selection,
        predicate: isListItemNode,
      });
  
      if (!foundListItem) {
        return false;
      }
  
      const { node: listItem } = foundListItem;
  
      const list = tr.doc.resolve(foundListItem.pos).parent;
  
      // cover ordered list item to bullet list item
      if (list.type.name === 'orderedList') {
        wrapSelectedItems({
          listType: schema.nodes.bulletList,
          itemType: schema.nodes.listItem,
          tr,
        });
        dispatch?.(tr);
        return true;
      }
  
      // cover bullet list item to unchecked task item
      else if (list.type.name === 'bulletList') {
        wrapSelectedItems({
          listType: schema.nodes.taskList,
          itemType: schema.nodes.taskListItem,
          tr,
        });
        dispatch?.(tr);
        return true;
      }
  
      // cover uncheck task item to checked task item
      else if (listItem.type.name === 'taskListItem' && !listItem.attrs.checked) {
        this.store.commands.toggleCheckboxChecked();
        return true;
      }
  
      // cover check task item to ordered list item
      else if (listItem.type.name === 'taskListItem' && !!listItem.attrs.checked) {
        wrapSelectedItems({
          listType: schema.nodes.orderedList,
          itemType: schema.nodes.listItem,
          tr,
        });
        dispatch?.(tr);
        return true;
      }
  
      return false;
    }
  }
  export {ToggleListItemExtension}
  