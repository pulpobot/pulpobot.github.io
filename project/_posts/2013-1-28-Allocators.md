---
layout: post
title: Allocators
category: project
---

![Fragmented](/images/allocators/fragmented.png)

While it's easy to allocate memory through dynamic allocations, the results leave little to be desired. Dynamic allocations are performance heavy and result in fragmented memory. To alleviate these issues, allocators can be used to more efficiently utilize memory. For this post, I'll be looking at several non-growable allocators.

<!--more-->

<ul id="toc"></ul>

Instead of dynamically allocating memory on the fly, it would significantly more efficient if the needed memory was allocated "once" upfront. By allocating memory once upfront, the memory can be passed off to an allocator to manage the memory.

## Linear Allocator

![Linear](/images/allocators/linear.png)

The *Linear Allocator* maintains a start, offset, and end point into a chunk of memory. When a request for memory is made `allocate(size, alignment)` the allocator returns a pointer to the current offset, and updates the offset with the aligned size of the allocation. An allocation will be successful if the offset + allocation size are less than or equal to the end. To deallocate the memory, the offset is set to the start of the array. This makes the allocator ideal for POD data, because it doesn't call the destructors. If non-POD data is desired, then a intrusive list tracking the destructors can be intertwined into the data (see the finalizer in the *Scope Stack Allocator* below). This type of allocator is useful in frame based allocations that get reset on every frame.

## Stack Allocator

![Stack Pop](/images/allocators/stack-pop.png)

The *Stack Allocator* works the same as the *Linear Allocator* 
with the addition of deallocation in a LIFO order. This is accomplished by prefixing allocations with the previous offset. Then on a deallocation `deallocate(void* ptr)`, the ptr addres is shifted backwards to retrieve the old offset and then it's applied as the new offset. The allocator can be extended into a double ended stack allocator that allows for allocations on the start and end of a chunk of memory.

## Scope Stack Allocator

![Scope Stack](/images/allocators/scope-stack.png)

The *Scope Stack Allocator* (introduced by Dice [here](http://dice.se/wp-content/uploads/scopestacks_public.pdf)) draws from the linear and stack allocator with support for non-POD type data. A base allocator is used to allocate data requested from one or more scope stacks. The above figure shows two scopes: a parent and child. The parent allocates the desired amount of me memory, and then passes control to the sub scope to allocate memory. Once the child goes out of scope, it's popped off the stack, and the linear allocator's offset is set back to the end of the parent.

![Scope Stack Finalizer](/images/allocators/scope-stack-finalizer.png)

To better accommodate for POD and non-POD an intrusive list can be used to call object destructors when rewinding the offset of the allocator on deallocation. If object type is allocated, then a "finalizer" will be allocated just before the object data and connected to the list. On deallocation, the finalizer list will be traversed, the object destructors will be called, and the offset pointer will be rewound.

## Pool Allocator

![Pool](/images/allocators/pool.png)

The *Pool Allocator* allows for unordered deallocation with handled fragmentation. This is accomplished by subdividing the chunk of memory into elements of equal size (e.g., 8, 16, 32, …, 512 bytes). Then all of the free elements are chained together in a linked list and temporarily stored in the same place as the data. On allocation, the first element in the list is unlinked and returned. On deallocation, the returned pointer is relinked to the front of list.

## Resources

* [Molecular Musings - Linear Allocator](http://molecularmusings.wordpress.com/2012/08/14/memory-allocation-strategies-a-linear-allocator/), [Stack Allocator](http://molecularmusings.wordpress.com/2012/08/27/memory-allocation-strategies-a-stack-like-lifo-allocator/), [Pool Allocator](http://molecularmusings.wordpress.com/2012/09/17/memory-allocation-strategies-a-pool-allocator/)
* [Dice - Scope Stack](http://dice.se/wp-content/uploads/scopestacks_public.pdf)
* [AltDevBlog - Alternatives to New and Malloc](http://www.altdevblogaday.com/2011/02/12/alternatives-to-malloc-and-new/)
* [Bitsquid - Custom Memory Allocation](http://bitsquid.blogspot.com/2010/09/custom-memory-allocation-in-c.html)

## Source

* [Download](/source/allocators/allocators.zip)
